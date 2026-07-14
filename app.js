// TROUVÉO MARKET — VITRINE PUBLIQUE PROFESSIONNELLE
// Catalogue officiel : 22 produits Amazon réels, sans doublons.
// Les sections internes et administratives ne sont pas exposées dans la version publique.

const OFFICIAL_URL = "https://trouveo-mark.netlify.app";
const AFFILIATE_HOSTS = ["amzn.to", "amazon.fr", "awin", "linksynergy", "tradetracker"];
const STORAGE_CATALOG_KEY = "trouveo_market_catalogue_officiel_v2";
const PUBLIC_SECTIONS = ["market", "shop", "deals", "nearby"];

function isAffiliateUrl(url) {
  const raw = String(url || "").toLowerCase();
  return AFFILIATE_HOSTS.some(host => raw.includes(host)) || raw.includes("tag=trouveomarket-21");
}

function sanitizeText(value) {
  return String(value ?? "")
    .replace(/<[^>]*>/g, "")
    .replace(/[<>"'`]/g, "")
    .trim();
}

function escapeHtml(value) {
  return sanitizeText(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeUrl(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  const lower = raw.toLowerCase();
  if (lower.startsWith("javascript:") || lower.startsWith("data:")) return "";
  return raw;
}

function sanitizeItem(item) {
  const safe = {
    ...(item || {}),
    type: item && ["product", "deal", "service"].includes(item.type) ? item.type : "deal",
    title: sanitizeText(item?.title),
    category: sanitizeText(item?.category),
    price: sanitizeText(item?.price),
    city: sanitizeText(item?.city),
    desc: sanitizeText(item?.desc),
    cta: sanitizeText(item?.cta),
    url: sanitizeUrl(item?.url),
    keywords: sanitizeText(item?.keywords)
  };

  if (isAffiliateUrl(safe.url)) {
    safe.type = "product";
    safe.category = safe.category || "Produit affilié";
    safe.cta = safe.cta || "Voir sur Amazon";
    safe.keywords = `${safe.keywords || ""} affiliation amazon boutique produit`.trim();
  }
  return safe;
}

function normalizeText(value) {
  return String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function dedupeItems(itemsList) {
  const result = [];
  const seen = new Set();
  itemsList.forEach(item => {
    const safe = sanitizeItem(item);
    const key = normalizeText(safe.url || safe.title);
    if (!key || seen.has(key)) return;
    seen.add(key);
    result.push(safe);
  });
  return result;
}

function readJsonStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function persistItems(itemsList) {
  const safeItems = dedupeItems(itemsList.map(sanitizeItem));
  localStorage.setItem(STORAGE_CATALOG_KEY, JSON.stringify(safeItems));
  return safeItems;
}

const OFFICIAL_PRODUCTS = [
  { type:"product", title:"SAVANA – Lemmings, jeu coopératif familial", category:"Jeux / Famille", price:"Voir le prix sur Amazon", city:"France", desc:"Jeu coopératif familial pour partager des parties rapides.", cta:"Voir sur Amazon", url:"https://amzn.to/3RD1Meh", keywords:"jeu famille savana lemmings coopératif" },
  { type:"product", title:"Rowenta X-Pert 6.60 – Aspirateur multifonction", category:"Maison / Entretien", price:"Voir le prix sur Amazon", city:"France", desc:"Aspirateur balai multifonction pour l’entretien quotidien.", cta:"Voir sur Amazon", url:"https://amzn.to/451G46M", keywords:"rowenta aspirateur maison entretien" },
  { type:"product", title:"Piège à moustiques électrique silencieux", category:"Maison / Extérieur", price:"Voir le prix sur Amazon", city:"France", desc:"Solution électrique silencieuse contre les moustiques.", cta:"Voir sur Amazon", url:"https://amzn.to/4vus40b", keywords:"moustique électrique extérieur maison" },
  { type:"product", title:"Blendura – Balance numérique portable pour bagages", category:"Voyage / Accessoires", price:"Voir le prix sur Amazon", city:"France", desc:"Balance compacte pour contrôler le poids des valises.", cta:"Voir sur Amazon", url:"https://amzn.to/3T1Pe0n", keywords:"voyage bagage balance valise" },
  { type:"product", title:"RUIMEN – Montre connectée multifonction", category:"High-Tech / Montres", price:"Voir le prix sur Amazon", city:"France", desc:"Montre connectée avec fonctions sport et suivi d’activité.", cta:"Voir sur Amazon", url:"https://amzn.to/4fv6y6J", keywords:"smartwatch montre connectée sport" },
  { type:"product", title:"Miracase – Support téléphone voiture 360°", category:"Auto / Accessoires", price:"Voir le prix sur Amazon", city:"France", desc:"Support téléphone orientable pour voiture.", cta:"Voir sur Amazon", url:"https://amzn.to/4wEKAnB", keywords:"auto voiture support téléphone smartphone" },
  { type:"product", title:"FOMYHEARD – Tire-lait électrique rechargeable", category:"Bébé / Maternité", price:"Voir le prix sur Amazon", city:"France", desc:"Tire-lait portable rechargeable avec intensité réglable.", cta:"Voir sur Amazon", url:"https://amzn.to/3SZIjoz", keywords:"bébé maternité allaitement tire lait" },
  { type:"product", title:"DREO – Ventilateur colonne avec télécommande", category:"Maison / Confort", price:"Voir le prix sur Amazon", city:"France", desc:"Ventilateur colonne pour améliorer le confort à la maison.", cta:"Voir sur Amazon", url:"https://amzn.to/4aPUhHk", keywords:"ventilateur maison confort été" },
  { type:"product", title:"INIU – Batterie externe 10 000 mAh", category:"High-Tech / Énergie", price:"Voir le prix sur Amazon", city:"France", desc:"Batterie compacte pour recharger les appareils mobiles.", cta:"Voir sur Amazon", url:"https://amzn.to/3Tec84H", keywords:"batterie externe powerbank téléphone" },
  { type:"product", title:"Aioneus – Chargeur secteur USB-C", category:"High-Tech / Chargeurs", price:"Voir le prix sur Amazon", city:"France", desc:"Adaptateur secteur USB-C compatible avec de nombreux smartphones.", cta:"Voir sur Amazon", url:"https://amzn.to/4yhRj8u", keywords:"chargeur usb c smartphone" },
  { type:"product", title:"Biodance – Bio Collagen Real Deep Mask", category:"Beauté / Visage", price:"Voir le prix sur Amazon", city:"France", desc:"Masque de soin du visage au collagène.", cta:"Voir sur Amazon", url:"https://amzn.to/4eWjane", keywords:"beauté masque visage collagène" },
  { type:"product", title:"HOVVIDA – Éclairage LED avec télécommande", category:"Maison / Éclairage", price:"Voir le prix sur Amazon", city:"France", desc:"Éclairage décoratif avec télécommande et minuterie.", cta:"Voir sur Amazon", url:"https://amzn.to/3SP4aix", keywords:"led éclairage décoration maison" },
  { type:"product", title:"Apple AirTag", category:"High-Tech / Localisation", price:"Voir le prix sur Amazon", city:"France", desc:"Traceur pour retrouver clés, sac, portefeuille ou bagages.", cta:"Voir sur Amazon", url:"https://amzn.to/4fmFq8W", keywords:"airtag apple localisation bagage clés" },
  { type:"product", title:"TP-Link Tapo C210 – Caméra intérieure 2K", category:"Maison connectée / Sécurité", price:"Voir le prix sur Amazon", city:"France", desc:"Caméra Wi-Fi intérieure avec rotation et audio bidirectionnel.", cta:"Voir sur Amazon", url:"https://amzn.to/4gwqtDj", keywords:"caméra sécurité maison connectée tapo" },
  { type:"product", title:"Thermomètre frontal infrarouge", category:"Santé / Bien-être", price:"Voir le prix sur Amazon", city:"France", desc:"Thermomètre numérique frontal sans contact.", cta:"Voir sur Amazon", url:"https://amzn.to/3SQhFOW", keywords:"santé thermomètre frontal infrarouge" },
  { type:"product", title:"L’Oréal Professionnel – Shampoing réparateur", category:"Beauté / Cheveux", price:"Voir le prix sur Amazon", city:"France", desc:"Shampoing professionnel pour cheveux abîmés.", cta:"Voir sur Amazon", url:"https://amzn.to/4fmFvtg", keywords:"beauté cheveux shampoing l'oréal" },
  { type:"product", title:"Ventilateur portable pour poussette – 5 200 mAh", category:"Bébé / Accessoires", price:"Voir le prix sur Amazon", city:"France", desc:"Ventilateur rechargeable et orientable pour poussette.", cta:"Voir sur Amazon", url:"https://amzn.to/44xdyK6", keywords:"bébé poussette ventilateur été" },
  { type:"product", title:"Blink – Sonnette vidéo 2K sur batterie", category:"Maison connectée / Sécurité", price:"Voir le prix sur Amazon", city:"France", desc:"Sonnette vidéo connectée avec détection et notifications.", cta:"Voir sur Amazon", url:"https://amzn.to/3QT9JMh", keywords:"blink sonnette vidéo sécurité" },
  { type:"product", title:"Blink Mini 2 – Caméra connectée 2K", category:"Maison connectée / Sécurité", price:"Voir le prix sur Amazon", city:"France", desc:"Caméra compacte pour surveiller l’intérieur de la maison.", cta:"Voir sur Amazon", url:"https://amzn.to/4wMnL1v", keywords:"blink caméra 2k maison sécurité" },
  { type:"product", title:"Scozzi – Support universel pour smartphone", category:"Auto / Accessoires", price:"Voir le prix sur Amazon", city:"France", desc:"Support universel pour smartphone, pratique en déplacement.", cta:"Voir sur Amazon", url:"https://amzn.to/3ThINq1", keywords:"support smartphone téléphone auto" },
  { type:"product", title:"POPERFUN – Ventilateur poussette 10 000 mAh", category:"Bébé / Accessoires", price:"Voir le prix sur Amazon", city:"France", desc:"Ventilateur rechargeable longue autonomie pour poussette.", cta:"Voir sur Amazon", url:"https://amzn.to/4w1S841", keywords:"bébé poussette ventilateur 10000mah" },
  { type:"product", title:"Amazon Echo Show 5 – 3e génération", category:"Maison connectée / Assistants", price:"Voir le prix sur Amazon", city:"France", desc:"Écran connecté avec Alexa pour la maison.", cta:"Voir sur Amazon", url:"https://amzn.to/4yfN11H", keywords:"echo show alexa maison connectée" }
];

const BASE_DEALS = [
  { type:"deal", title:"Restaurant autour de moi", category:"Bons plans locaux", price:"À consulter", city:"France", desc:"Rechercher des restaurants proches.", cta:"Ouvrir Maps", url:"", keywords:"restaurant local bon plan" },
  { type:"deal", title:"Coiffeur autour de moi", category:"Services utiles", price:"À consulter", city:"France", desc:"Rechercher un coiffeur proche.", cta:"Ouvrir Maps", url:"", keywords:"coiffeur salon local" }
];

function loadItemsWithBaseCatalog() {
  const saved = readJsonStorage(STORAGE_CATALOG_KEY, []);
  const officialUrls = new Set(OFFICIAL_PRODUCTS.map(item => normalizeText(item.url)));
  const personalExtras = saved.filter(item => !officialUrls.has(normalizeText(item?.url)));
  return persistItems([...OFFICIAL_PRODUCTS, ...personalExtras, ...BASE_DEALS]);
}

let items = loadItemsWithBaseCatalog();
let lastPosition = null;

function show(id) {
  PUBLIC_SECTIONS.forEach(name => {
    const el = document.getElementById(name);
    if (el) el.classList.toggle("hidden", name !== id);
  });
  render();
}

function filtered(type) {
  const query = normalizeText(document.getElementById("q")?.value || "");
  const typeFilter = document.getElementById("typeFilter")?.value || "";
  return items.filter(item =>
    (!type || item.type === type) &&
    (!typeFilter || item.type === typeFilter) &&
    (!query || normalizeText(`${item.title} ${item.category} ${item.city} ${item.desc} ${item.keywords || ""}`).includes(query))
  );
}

function mapsUrl(query, city) {
  const search = [query, city].filter(Boolean).join(" ").trim() || "commerce";
  if (lastPosition) return `https://www.google.com/maps/search/${encodeURIComponent(search)}/@${lastPosition.lat.toFixed(6)},${lastPosition.lng.toFixed(6)},14z`;
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(search);
}

function actionUrl(item) {
  const raw = sanitizeUrl(item?.url || "").trim();
  if (!raw) return mapsUrl(item.title, item.city);
  if (/^https?:\/\//i.test(raw) || /^mailto:/i.test(raw) || /^tel:/i.test(raw)) return raw;
  return "https://www.google.com/search?q=" + encodeURIComponent(raw);
}

function card(item) {
  const label = item.type === "product" ? "Boutique" : item.type === "deal" ? "Bon plan" : "Service";
  const linkRel = item.type === "product" ? "noopener noreferrer sponsored" : "noopener noreferrer";
  return `<article class="card"><div class="tag">${escapeHtml(`${label} · ${item.category}`)}</div><h3>${escapeHtml(item.title)}</h3><div class="price">${escapeHtml(item.price)}</div><p>${escapeHtml(item.desc)}</p><p><b>Zone :</b> ${escapeHtml(item.city)}</p><div class="actions"><a class="btn" target="_blank" rel="${linkRel}" href="${actionUrl(item)}">${escapeHtml(item.cta || "Voir")}</a><a class="btn alt" target="_blank" rel="noopener noreferrer" href="${mapsUrl(item.title, item.city)}">Autour</a></div></article>`;
}

function render() {
  const shop = document.getElementById("shop");
  const deals = document.getElementById("deals");
  if (shop) shop.innerHTML = filtered("product").map(card).join("") || "<p class='sub'>Aucun résultat.</p>";
  if (deals) deals.innerHTML = filtered("deal").map(card).join("") || "<p class='sub'>Aucun bon plan.</p>";
  renderNearbyCards();
}

function showQR() {
  document.getElementById("qrBox")?.classList.remove("hidden");
}

function downloadQR() {
  const link = document.createElement("a");
  link.href = "assets/qr-trouveo-market.png";
  link.download = "QR_Trouveo_Market.png";
  link.click();
}

function copyLink() {
  navigator.clipboard?.writeText(OFFICIAL_URL).catch(() => {});
  alert("Lien officiel copié.");
}

function searchNearby(term) {
  const city = document.getElementById("nearbyCity")?.value || "";
  window.open(mapsUrl(term, city), "_blank", "noopener,noreferrer");
}

function openNearby() {
  const query = document.getElementById("nearbyQuery")?.value || document.getElementById("q")?.value || "bons plans";
  const city = document.getElementById("nearbyCity")?.value || "";
  window.open(mapsUrl(query, city), "_blank", "noopener,noreferrer");
}

function renderNearbyCards() {
  const box = document.getElementById("nearbyCards");
  if (!box) return;
  const presets = ["restaurant", "chocolatier", "supermarché", "téléphone", "coiffeur", "garage", "bricolage", "électroménager", "pharmacie"];
  box.innerHTML = presets.map(preset => `<article class="card"><div class="tag">Autour</div><h3>${escapeHtml(preset)}</h3><p>Recherche rapide autour de vous ou dans la ville indiquée.</p><div class="actions"><button class="btn alt" type="button" onclick="searchNearby('${String(preset).replace(/'/g, "\\'")}')">Ouvrir Maps</button></div></article>`).join("");
}

function useGeo() {
  const box = document.getElementById("locationStatus");
  if (!box) return;
  box.classList.remove("hidden");
  if (!navigator.geolocation) {
    box.textContent = "Géolocalisation non disponible.";
    return;
  }

  box.textContent = "Demande d’autorisation de géolocalisation…";
  navigator.geolocation.getCurrentPosition(position => {
    lastPosition = { lat: position.coords.latitude, lng: position.coords.longitude };
    box.textContent = "Position détectée. Les recherches utilisent maintenant votre position.";
    show("nearby");
    render();
  }, error => {
    box.textContent = error.code === 1
      ? "Autorisation refusée. Saisissez une ville."
      : "Position indisponible. Réessayez ou saisissez une ville.";
  }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 });
}

function startVoice() {
  const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognitionClass) return alert("Utilisez Chrome pour la recherche vocale.");

  const recognition = new SpeechRecognitionClass();
  recognition.lang = "fr-FR";
  recognition.interimResults = false;
  recognition.onresult = event => {
    const input = document.getElementById("q");
    if (input) input.value = event.results[0][0].transcript;
    render();
  };
  recognition.onerror = () => alert("Micro bloqué ou refusé.");
  recognition.start();
}

show("market");
render();
