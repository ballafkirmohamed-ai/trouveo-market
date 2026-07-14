// TROUVÉO MARKET — VITRINE PUBLIQUE PROFESSIONNELLE
// Les liens Amazon restent des recherches affiliées avec le tag partenaire trouveomarket-21.
// Les sections internes et administratives ne sont pas exposées dans la version publique.

const OFFICIAL_URL = "https://trouveo-market.netlify.app";
const AFFILIATE_HOSTS = ["amzn.to", "amazon.fr", "awin", "linksynergy", "tradetracker"];
const STORAGE_CATALOG_KEY = "trouveo_market_catalogue_v1";
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
    safe.category = safe.category || "Recherche affiliée";
    safe.cta = safe.cta || "Voir la recherche Amazon";
    safe.keywords = `${safe.keywords || ""} affiliation amazon boutique produit`.trim();
  }
  return safe;
}

function normalizeText(s) {
  return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function dedupeItems(itemsList) {
  const result = [];
  const seen = new Map();

  itemsList.forEach(item => {
    const safe = sanitizeItem(item);
    const titleKey = normalizeText(safe.title || "");
    const affiliateUrl = safe.url && isAffiliateUrl(safe.url) ? normalizeText(safe.url) : "";
    const keys = affiliateUrl ? [affiliateUrl] : [];
    if (titleKey) keys.push(`title:${titleKey}`);

    const existingIndex = keys.map(key => seen.get(key)).find(index => index !== undefined);
    if (existingIndex === undefined) {
      if (affiliateUrl) seen.set(affiliateUrl, result.length);
      if (titleKey) seen.set(`title:${titleKey}`, result.length);
      result.push(safe);
      return;
    }

    const existingItem = result[existingIndex];
    const existingHasAffiliate = Boolean(existingItem?.url && isAffiliateUrl(existingItem.url));
    const currentHasAffiliate = Boolean(affiliateUrl);

    if (currentHasAffiliate && !existingHasAffiliate) {
      result[existingIndex] = safe;
    }
  });

  return result;
}

function readJsonStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch (error) {
    return fallback;
  }
}

function persistItems(itemsList) {
  const safeItems = dedupeItems(itemsList.map(sanitizeItem));
  localStorage.setItem(STORAGE_CATALOG_KEY, JSON.stringify(safeItems));
  return safeItems;
}

const SAVANA_CANONICAL_ITEM = {
  type: "product",
  title: "SAVANA Smash Party – Grizzy et les Lemmings",
  category: "Jeux / Famille",
  price: "Voir le prix sur Amazon",
  city: "France",
  desc: "Jeu de société familial coopératif pour 2 à 6 joueurs, dès 4 ans. Parties rapides d’environ 15 minutes.",
  cta: "Voir le produit",
  url: "https://amzn.to/3SZGqrQ",
  keywords: "savana smash party grizzy et les lemmings jeu de société familial coopératif"
};

function isSavanaCanonical(item) {
  const safe = sanitizeItem(item);
  const title = normalizeText(safe.title || "");
  const url = normalizeText(safe.url || "");
  return title.includes("savana smash party – grizzy et les lemmings") && url.includes("amzn.to/3szgqrq");
}

function isLegacySavanaItem(item) {
  const safe = sanitizeItem(item);
  const searchText = normalizeText(`${safe.title || ""} ${safe.url || ""} ${safe.keywords || ""} ${safe.desc || ""}`);
  return !isSavanaCanonical(safe) && (searchText.includes("savana") || searchText.includes("amzn.to/3szgqrq") || searchText.includes("savana smash party"));
}

function migrateCatalogItems(itemsList) {
  const withoutLegacySavana = itemsList.filter(item => !isLegacySavanaItem(item));
  return dedupeItems([...withoutLegacySavana, SAVANA_CANONICAL_ITEM]);
}

const BASE_ITEMS = [
  { type: "product", title: "Recherche Amazon · support téléphone voiture", category: "Recherche affiliée", price: "À comparer", city: "France", desc: "Recherche partenaire Amazon pour un support téléphone voiture.", cta: "Voir la recherche Amazon", url: "https://www.amazon.fr/s?k=support+t%C3%A9l%C3%A9phone+voiture&tag=trouveomarket-21", keywords: "telephone voiture support gps auto tech" },
  { type: "product", title: "Recherche Amazon · support téléphone voiture", category: "Recherche affiliée", price: "À comparer", city: "France", desc: "Recherche partenaire Amazon pour un support téléphone voiture.", cta: "Voir la recherche Amazon", url: "https://www.amazon.fr/s?k=support+t%C3%A9l%C3%A9phone+voiture&tag=trouveomarket-21", keywords: "telephone voiture support gps auto tech" },
  { type: "product", title: "Recherche Amazon · aspirateur voiture compact", category: "Recherche affiliée", price: "À comparer", city: "France", desc: "Recherche partenaire Amazon pour un aspirateur compact et pratique en déplacement.", cta: "Voir la recherche Amazon", url: "https://www.amazon.fr/s?k=aspirateur+voiture+compact&tag=trouveomarket-21", keywords: "aspirateur voiture auto nettoyage" },
  { type: "product", title: "Recherche Amazon · organisateur coffre voiture", category: "Recherche affiliée", price: "À comparer", city: "France", desc: "Recherche partenaire Amazon pour un accessoire de rangement voiture.", cta: "Voir la recherche Amazon", url: "https://www.amazon.fr/s?k=organisateur+coffre+voiture&tag=trouveomarket-21", keywords: "organisateur coffre voiture rangement" },
  { type: "product", title: "Recherche Amazon · chargeur USB-C voiture", category: "Recherche affiliée", price: "À comparer", city: "France", desc: "Recherche partenaire Amazon pour un chargeur USB-C adapté à la route.", cta: "Voir la recherche Amazon", url: "https://www.amazon.fr/s?k=chargeur+usb+c+voiture&tag=trouveomarket-21", keywords: "chargeur usbc voiture auto tech" },
  { type: "product", title: "Recherche Amazon · organisateur de câbles bureau", category: "Recherche affiliée", price: "À comparer", city: "France", desc: "Recherche partenaire Amazon pour un rangement de bureau simple et propre.", cta: "Voir la recherche Amazon", url: "https://www.amazon.fr/s?k=organisateur+c%C3%A2bles+bureau&tag=trouveomarket-21", keywords: "bureau cables rangement maison" },
  { type: "deal", title: "Recherche locale · restaurant", category: "Bons plans", price: "À consulter", city: "France", desc: "Ouverture de la recherche Google Maps autour de votre position ou de la ville indiquée.", cta: "Ouvrir Maps", url: "https://www.google.com/maps/search/restaurant", keywords: "restaurant local bon plan" },
  { type: "deal", title: "Recherche locale · coiffeur", category: "Bons plans", price: "À consulter", city: "France", desc: "Recherche locale rapide pour les services de proximité.", cta: "Ouvrir Maps", url: "https://www.google.com/maps/search/coiffeur", keywords: "coiffeur salon local" }
];

function loadItemsWithBaseCatalog() {
  const legacyItems = readJsonStorage("trouveo_market_items_v3", []);
  const previousCatalog = readJsonStorage("trouveo_market_items_v4_amazon_catalogue", []);
  const saved = readJsonStorage(STORAGE_CATALOG_KEY, []);
  const merged = migrateCatalogItems([...BASE_ITEMS.map(sanitizeItem), ...saved, ...previousCatalog, ...legacyItems]);
  return persistItems(merged);
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
  const q = normalizeText(document.getElementById("q")?.value || "");
  const tf = document.getElementById("typeFilter")?.value || "";
  return items.filter(item => (!type || item.type === type) && (!tf || item.type === tf) && (!q || normalizeText(`${item.title} ${item.category} ${item.city} ${item.desc} ${item.keywords || ""}`).includes(q)));
}

function mapsUrl(q, city) {
  const query = [q, city].filter(Boolean).join(" ").trim() || "commerce";
  if (lastPosition) {
    return `https://www.google.com/maps/search/${encodeURIComponent(query)}/@${lastPosition.lat.toFixed(6)},${lastPosition.lng.toFixed(6)},14z`;
  }
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query);
}

function actionUrl(item) {
  const raw = sanitizeUrl(item?.url || "").trim();
  if (!raw) return mapsUrl(item.title, item.city);
  if (/^https?:\/\//i.test(raw) || /^mailto:/i.test(raw) || /^tel:/i.test(raw)) return raw;
  if (/^[+0-9 .()\-]{6,}$/.test(raw)) return "tel:" + raw.replace(/[^+0-9]/g, "");
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) return "mailto:" + raw;
  return "https://www.google.com/search?q=" + encodeURIComponent(raw);
}

function card(item) {
  const label = item.type === "product" ? "Boutique" : item.type === "deal" ? "Bon plan" : "Service";
  const safeLabel = escapeHtml(`${label} · ${item.category}`);
  const safeTitle = escapeHtml(item.title);
  const safePrice = escapeHtml(item.price);
  const safeDesc = escapeHtml(item.desc);
  const safeCity = escapeHtml(item.city);
  const safeCta = escapeHtml(item.cta || "Voir");
  return `<article class="card"><div class="tag">${safeLabel}</div><h3>${safeTitle}</h3><div class="price">${safePrice}</div><p>${safeDesc}</p><p><b>Zone :</b> ${safeCity}</p><div class="actions"><a class="btn" target="_blank" rel="noopener noreferrer" href="${actionUrl(item)}">${safeCta}</a><a class="btn alt" target="_blank" rel="noopener noreferrer" href="${mapsUrl(item.title, item.city)}">Autour</a></div></article>`;
}

function render() {
  const shop = document.getElementById("shop");
  const deals = document.getElementById("deals");
  if (shop) shop.innerHTML = filtered("product").map(card).join("") || "<p class='sub'>Aucun résultat pour cette recherche.</p>";
  if (deals) deals.innerHTML = filtered("deal").map(card).join("") || "<p class='sub'>Aucun bon plan pour l’instant.</p>";
  renderNearbyCards();
}

function showQR() {
  const qrBox = document.getElementById("qrBox");
  const qrImg = document.getElementById("qrImg");
  if (qrBox) qrBox.classList.remove("hidden");
  if (qrImg) qrImg.src = "assets/qr-trouveo-market.png";
}

function downloadQR() {
  const a = document.createElement("a");
  a.href = "assets/qr-trouveo-market.png";
  a.download = "QR_Trouveo_Market.png";
  a.click();
}

function copyLink() {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(OFFICIAL_URL).catch(() => {});
  }
  alert("Lien officiel copié.");
}

function searchNearby(term) {
  const city = document.getElementById("nearbyCity")?.value || "";
  window.open(mapsUrl(term, city), "_blank", "noopener,noreferrer");
}

function openNearby() {
  const q = document.getElementById("nearbyQuery")?.value || document.getElementById("q")?.value || "bons plans";
  const city = document.getElementById("nearbyCity")?.value || "";
  window.open(mapsUrl(q, city), "_blank", "noopener,noreferrer");
}

function renderNearbyCards() {
  const box = document.getElementById("nearbyCards");
  if (!box) return;
  const presets = ["restaurant", "chocolatier", "supermarché", "téléphone", "coiffeur", "garage", "bricolage", "électroménager", "pharmacie"];
  const city = document.getElementById("nearbyCity")?.value || "";
  box.innerHTML = presets.map(p => `<article class="card"><div class="tag">Autour</div><h3>${escapeHtml(p)}</h3><p>Recherche rapide autour de vous ou dans la ville indiquée.</p><div class="actions"><button class="btn alt" type="button" onclick="searchNearby('${String(p).replace(/'/g, "\\'")}')">Ouvrir Maps</button></div></article>`).join("");
}

function useGeo() {
  const box = document.getElementById("locationStatus");
  if (!box) return;
  box.classList.remove("hidden");
  if (!navigator.geolocation) {
    box.textContent = "Géolocalisation non disponible sur ce navigateur.";
    return;
  }

  box.textContent = "Demande d’autorisation de géolocalisation…";
  navigator.geolocation.getCurrentPosition(
    pos => {
      lastPosition = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      const accuracy = Number.isFinite(pos.coords.accuracy) ? `${Math.round(pos.coords.accuracy)} m` : "précision inconnue";
      box.textContent = `Position détectée à ${lastPosition.lat.toFixed(4)}, ${lastPosition.lng.toFixed(4)} (${accuracy}). Les recherches Google Maps utilisent maintenant votre position.`;
      show("nearby");
      render();
    },
    error => {
      let detail = "La géolocalisation a été refusée ou bloquée.";
      if (error.code === 1) detail = "Autorisation de géolocalisation refusée. Vous pouvez saisir une ville manuellement.";
      if (error.code === 2) detail = "Position introuvable pour le moment. Vérifiez votre réseau ou votre appareil.";
      if (error.code === 3) detail = "Le délai de localisation a expiré. Réessayez ou saisissez une ville.";
      box.textContent = detail;
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
  );
}

function startVoice() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return alert("Le micro vocal n’est pas compatible avec ce navigateur. Essaie Chrome.");
  const rec = new SR();
  rec.lang = "fr-FR";
  rec.interimResults = false;
  rec.onresult = e => {
    const value = e.results[0][0].transcript;
    const input = document.getElementById("q");
    if (input) input.value = value;
    render();
  };
  rec.onerror = () => alert("Micro bloqué ou refusé. Autorise le micro dans le navigateur.");
  rec.start();
}

show("market");
render();
