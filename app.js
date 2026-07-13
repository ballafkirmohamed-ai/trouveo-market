// TROUVÉO MARKET — AMAZON PARTENAIRES BRANCHÉ
// ID Partenaire Amazon France : trouveomarket-21
// Les liens Amazon de la boutique incluent maintenant le tag partenaire.
// Règle : conserver une mention claire "liens affiliés" sur le site et les publications.
// Après 3 ventes éligibles, Amazon pourra examiner le site comme indiqué dans ton espace Partenaires.

const OFFICIAL_URL = "https://trouveo-market.netlify.app";
const AFFILIATE_HOSTS = ["amzn.to", "amazon.fr", "awin", "linksynergy", "tradetracker"];
const STORAGE_ITEMS_KEY = "trouveo_market_items_v4_amazon_catalogue";
const STORAGE_SUBS_KEY = "trouveo_market_subs_v4_amazon_catalogue";

function isAffiliateUrl(url) {
  const raw = String(url || "").toLowerCase();
  return AFFILIATE_HOSTS.some(host => raw.includes(host)) || raw.includes("tag=trouveomarket-21");
}

function normalizeAffiliateItem(item) {
  const next = { ...item };
  if (isAffiliateUrl(next.url)) {
    next.type = "product";
    if (!next.category || /bon plan/i.test(next.category)) {
      next.category = "Affiliation / À classer";
    }
    next.cta = "Voir le produit";
    next.keywords = ((next.keywords || "") + " affiliation amazon boutique produit").trim();
  }
  return next;
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
  return normalizeAffiliateItem(safe);
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
  localStorage.setItem(STORAGE_ITEMS_KEY, JSON.stringify(safeItems));
  return safeItems;
}

function persistSubs(subsList) {
  const safeSubs = subsList
    .filter(Boolean)
    .map(sub => ({
      ...sub,
      name: sanitizeText(sub?.name),
      price: sanitizeText(sub?.price),
      desc: sanitizeText(sub?.desc)
    }))
    .filter(sub => sub.name);

  const deduped = [];
  const seenNames = new Set();
  safeSubs.forEach(sub => {
    const key = normalizeText(sub.name || "");
    if (!key || seenNames.has(key)) return;
    seenNames.add(key);
    deduped.push(sub);
  });

  localStorage.setItem(STORAGE_SUBS_KEY, JSON.stringify(deduped));
  return deduped;
}

const BASE_ITEMS = [
  { type: "product", title: "Support téléphone voiture", category: "Auto / Tech", price: "À comparer", city: "France", desc: "Support pratique pour GPS et téléphone en voiture.", cta: "Voir produit", url: "https://www.amazon.fr/s?k=support+t%C3%A9l%C3%A9phone+voiture&tag=trouveomarket-21", keywords: "telephone voiture support gps auto tech" },
  { type: "product", title: "Aspirateur voiture compact", category: "Auto / Tech", price: "À comparer", city: "France", desc: "Petit aspirateur pour garder l’intérieur de la voiture propre.", cta: "Voir produit", url: "https://www.amazon.fr/s?k=aspirateur+voiture+compact&tag=trouveomarket-21", keywords: "aspirateur voiture auto nettoyage" },
  { type: "product", title: "Organisateur coffre voiture", category: "Auto / Rangement", price: "À comparer", city: "France", desc: "Rangement simple pour courses, outils et accessoires voiture.", cta: "Voir produit", url: "https://www.amazon.fr/s?k=organisateur+coffre+voiture&tag=trouveomarket-21", keywords: "organisateur coffre voiture rangement" },
  { type: "product", title: "Chargeur USB-C voiture", category: "Auto / Tech", price: "À comparer", city: "France", desc: "Accessoire utile pour charger téléphone et appareils en déplacement.", cta: "Voir produit", url: "https://www.amazon.fr/s?k=chargeur+usb+c+voiture&tag=trouveomarket-21", keywords: "chargeur usbc voiture auto tech" },
  { type: "product", title: "Organisateur de câbles bureau", category: "Bureau / Maison", price: "À comparer", city: "France", desc: "Pour ranger les câbles et garder un bureau propre.", cta: "Voir produit", url: "https://www.amazon.fr/s?k=organisateur+c%C3%A2bles+bureau&tag=trouveomarket-21", keywords: "bureau cables rangement maison" },
  { type: "product", title: "Support ordinateur portable", category: "Bureau / Tech", price: "À comparer", city: "France", desc: "Pour améliorer la posture et libérer de l’espace de travail.", cta: "Voir produit", url: "https://www.amazon.fr/s?k=support+ordinateur+portable&tag=trouveomarket-21", keywords: "support ordinateur portable bureau tech" }
];

const BASE_SUBS = [
  { name: "Découverte", price: "0 €", desc: "Fiche simple en attente de validation, sans mise en avant." },
  { name: "Visible", price: "10 €/mois", desc: "Présence dans l’onglet Bons plans avec lien, ville et catégorie." },
  { name: "Boost", price: "25 €/mois", desc: "Mise en avant prioritaire + QR code offre + texte publicitaire." },
  { name: "Sur mesure", price: "Personnalisé", desc: "Formule négociée pour marché, association, commerce ou campagne locale." }
];

const AD_TEXTS = {
  client: "🔥 Trouvéo Market est lancé !\n\nUne seule plateforme pour découvrir :\n🛍️ des produits utiles\n📍 des bons plans autour de vous\n🏪 des commerçants locaux\n🎯 des offres partenaires\n📲 un accès rapide par QR code\n\nDécouvrez Trouvéo Market ici :\nhttps://trouveo-market.netlify.app",
  merchant: "Vous êtes commerçant, artisan ou prestataire ?\n\nTrouvéo Market vous permet de proposer une offre, une promotion ou une mise en avant locale.\n\nObjectif :\n✅ gagner en visibilité\n✅ publier un bon plan\n✅ recevoir des demandes\n✅ apparaître dans une plateforme simple à partager par QR code\n\nDemandez votre mise en avant ici :\nhttps://trouveo-market.netlify.app",
  tiktok: "Nouvelle idée locale 🚀\n\nUne seule plateforme pour chercher des produits utiles, découvrir des bons plans et mettre en avant les commerçants autour de vous.\n\nÇa s’appelle Trouvéo Market.\n\nBoutique + bons plans + commerçants + QR code.\nLien : https://trouveo-market.netlify.app\n\n#trouveo #bonsplans #commerceLocal #boutiqueenligne #startupfrance",
  whatsapp: "Salut 👋\n\nJe te partage Trouvéo Market : une plateforme qui regroupe boutique, bons plans, offres locales et commerçants.\n\nLien : https://trouveo-market.netlify.app"
};

function loadItemsWithBaseCatalog() {
  const legacyItems = readJsonStorage("trouveo_market_items_v3", []);
  const saved = readJsonStorage(STORAGE_ITEMS_KEY, []);
  const merged = dedupeItems([...BASE_ITEMS.map(sanitizeItem), ...saved, ...legacyItems]);
  return persistItems(merged);
}

function loadSubscriptions() {
  const legacySubs = readJsonStorage("trouveo_market_subs_v3", []);
  const saved = readJsonStorage(STORAGE_SUBS_KEY, []);
  return persistSubs([...BASE_SUBS, ...saved, ...legacySubs]);
}

let items = loadItemsWithBaseCatalog();
let subs = loadSubscriptions();
let lastPosition = null;

function show(id) {
  ["market", "shop", "deals", "nearby", "merchant", "subscriptions", "publicity", "owner"].forEach(name => {
    const el = document.getElementById(name);
    if (el) el.classList.toggle("hidden", name !== id);
  });
  save();
  render();
}

function filtered(type) {
  const q = normalizeText(document.getElementById("q")?.value || "");
  const tf = document.getElementById("typeFilter")?.value || "";
  return items.filter(item => (!type || item.type === type) && (!tf || item.type === tf) && (!q || normalizeText(`${item.title} ${item.category} ${item.city} ${item.desc} ${item.keywords || ""}`).includes(q)));
}

function mapsUrl(q, city) {
  if (lastPosition) return `https://www.google.com/maps/search/${encodeURIComponent(q || "commerce")}/@${lastPosition.lat},${lastPosition.lng},14z`;
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent((q || "commerce") + " " + (city || ""));
}

function actionUrl(item) {
  const raw = sanitizeUrl(item?.url || "").trim();
  if (!raw) return mapsUrl(item.title, item.city);
  if (raw.startsWith("#merchant")) return OFFICIAL_URL + "/#merchant";
  if (/^https?:\/\//i.test(raw) || /^mailto:/i.test(raw) || /^tel:/i.test(raw)) return raw;
  if (/^[+0-9 .()\-]{6,}$/.test(raw)) return "tel:" + raw.replace(/[^+0-9]/g, "");
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) return "mailto:" + raw;
  return "https://www.google.com/search?q=" + encodeURIComponent(raw);
}

function card(item, idx) {
  const label = item.type === "product" ? "Boutique" : item.type === "deal" ? "Bon plan" : "Service";
  const safeLabel = escapeHtml(`${label} · ${item.category}`);
  const safeTitle = escapeHtml(item.title);
  const safePrice = escapeHtml(item.price);
  const safeDesc = escapeHtml(item.desc);
  const safeCity = escapeHtml(item.city);
  const safeCta = escapeHtml(item.cta || "Voir");
  return `<article class="card"><div class="tag">${safeLabel}</div><h3>${safeTitle}</h3><div class="price">${safePrice}</div><p>${safeDesc}</p><p><b>Zone :</b> ${safeCity}</p><div class="actions"><a class="btn" target="_blank" href="${actionUrl(item)}">${safeCta}</a><a class="btn alt" target="_blank" href="${mapsUrl(item.title, item.city)}">Autour</a></div></article>`;
}

function render() {
  const shop = document.getElementById("shop");
  const deals = document.getElementById("deals");
  const subsGrid = document.getElementById("subsGrid");
  if (shop) shop.innerHTML = filtered("product").map((item, idx) => card(item, idx)).join("") || "<p class='sub'>Aucun produit.</p>";
  if (deals) deals.innerHTML = filtered("deal").map((item, idx) => card(item, idx)).join("") || "<p class='sub'>Aucun bon plan.</p>";
  if (subsGrid) subsGrid.innerHTML = subs.map(sub => `<article class="card"><div class="tag">Formule</div><h3>${escapeHtml(sub.name)}</h3><div class="price">${escapeHtml(sub.price)}</div><p>${escapeHtml(sub.desc)}</p><div class="actions"><button class="btn" onclick="selectPlan('${String(sub.name).replace(/'/g, "\\'")}')">Choisir</button></div></article>`).join("");
  renderNearbyCards();
  renderAds();
}

function selectPlan(name) {
  show("merchant");
  const sel = document.getElementById("mSub");
  if (sel) sel.value = name;
}

function submitMerchantLocal() {
  const title = sanitizeText(document.getElementById("mName")?.value || "");
  if (!title) return alert("Nom du commerce obligatoire.");
  items.unshift({
    type: "deal",
    title,
    category: sanitizeText(document.getElementById("mCategory")?.value || ""),
    price: sanitizeText(document.getElementById("mOffer")?.value || "Offre à valider"),
    city: sanitizeText(document.getElementById("mCity")?.value || "Local"),
    desc: sanitizeText((document.getElementById("mDesc")?.value || "Demande commerçant à valider.") + " · Formule demandée : " + (document.getElementById("mSub")?.value || "")),
    cta: "Voir / contacter",
    url: sanitizeUrl(document.getElementById("mLink")?.value || OFFICIAL_URL),
    keywords: "demande commerçant publicité partenaire"
  });
  items = dedupeItems(items);
  save();
  alert("Demande ajoutée localement.");
  show("deals");
}

function unlock() {
  alert("L’accès propriétaire public est désactivé. Une authentification serveur est nécessaire avant toute modification depuis le navigateur.");
}

function addOwnerItem() {
  const title = sanitizeText(document.getElementById("oTitle")?.value || "");
  if (!title) return alert("Titre obligatoire.");

  const rawUrl = sanitizeUrl(document.getElementById("oUrl")?.value || "");
  const affiliate = isAffiliateUrl(rawUrl);
  const selectedType = document.getElementById("oType")?.value || "deal";
  const item = {
    type: affiliate ? "product" : selectedType,
    title,
    category: sanitizeText(document.getElementById("oCategory")?.value || "") || (affiliate ? "Affiliation / À classer" : "À classer"),
    price: sanitizeText(document.getElementById("oPrice")?.value || "") || "À définir",
    city: sanitizeText(document.getElementById("oCity")?.value || "") || "France",
    desc: sanitizeText(document.getElementById("oDesc")?.value || "") || "",
    cta: affiliate ? "Voir le produit" : "Voir",
    url: rawUrl || mapsUrl(title, document.getElementById("oCity")?.value || ""),
    keywords: title + (affiliate ? " affiliation amazon boutique produit" : "")
  };

  items.unshift(sanitizeItem(item));
  items = dedupeItems(items);
  save();
  ["oTitle", "oPrice", "oCategory", "oCity", "oUrl", "oDesc"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  render();

  if (affiliate) {
    alert("Lien affilié détecté : ajouté automatiquement dans Boutique.");
    show("shop");
  } else {
    alert("Ajouté.");
  }
}

function addSubscription() {
  const name = sanitizeText(document.getElementById("sName")?.value || "");
  if (!name) return alert("Nom de formule obligatoire.");
  subs.push({
    name,
    price: sanitizeText(document.getElementById("sPrice")?.value || "") || "Sur mesure",
    desc: sanitizeText(document.getElementById("sDesc")?.value || "") || "Formule personnalisée."
  });
  subs = persistSubs(subs);
  ["sName", "sPrice", "sDesc"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  render();
}

function exportItems() {
  const blob = new Blob([JSON.stringify({ items, subs }, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "trouveo_market_donnees.json";
  a.click();
  URL.revokeObjectURL(a.href);
}

function save() {
  try {
    items = persistItems(items);
    subs = persistSubs(subs);
  } catch (error) {
    console.warn("Storage inaccessible", error);
  }
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
  navigator.clipboard.writeText(OFFICIAL_URL);
  alert("Lien officiel copié.");
}

function openNearby() {
  const q = document.getElementById("nearbyQuery")?.value || document.getElementById("q")?.value || "bons plans";
  const city = document.getElementById("nearbyCity")?.value || "";
  window.open(mapsUrl(q, city), "_blank");
}

function renderNearbyCards() {
  const box = document.getElementById("nearbyCards");
  if (!box) return;
  const presets = ["restaurant", "téléphone", "supermarché", "coiffeur", "garage", "bricolage", "électroménager", "pharmacie"];
  const city = document.getElementById("nearbyCity")?.value || "";
  box.innerHTML = presets.map(p => `<article class="card"><div class="tag">Autour</div><h3>${escapeHtml(p)}</h3><p>Recherche rapide autour de toi ou de la ville indiquée.</p><div class="actions"><a class="btn alt" target="_blank" href="${mapsUrl(p, city)}">Ouvrir Maps</a></div></article>`).join("");
}

function useGeo() {
  const box = document.getElementById("locationStatus");
  if (!box) return;
  box.classList.remove("hidden");
  if (!navigator.geolocation) {
    box.textContent = "Géolocalisation non disponible sur ce navigateur.";
    return;
  }
  box.textContent = "Demande de localisation en cours…";
  navigator.geolocation.getCurrentPosition(
    pos => {
      lastPosition = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      box.textContent = "Position détectée. Les boutons Autour utilisent maintenant ta position.";
      show("nearby");
      render();
    },
    () => {
      box.textContent = "Localisation refusée ou bloquée. Tu peux utiliser une ville manuellement.";
    }
  );
}

function startVoice() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return alert("Le micro vocal n’est pas compatible avec ce navigateur. Essaie Chrome.");
  const rec = new SR();
  rec.lang = "fr-FR";
  rec.interimResults = false;
  rec.onresult = e => {
    document.getElementById("q").value = e.results[0][0].transcript;
    render();
  };
  rec.onerror = () => alert("Micro bloqué ou refusé. Autorise le micro dans le navigateur.");
  rec.start();
}

function labelAd(key) {
  return { client: "Texte client", merchant: "Texte commerçant", tiktok: "Script TikTok", whatsapp: "Message WhatsApp" }[key] || key;
}

function renderAds() {
  const box = document.getElementById("adTexts");
  if (!box) return;
  box.innerHTML = Object.entries(AD_TEXTS).map(([key, text]) => `<article class="card"><div class="tag">Publicité</div><h3>${escapeHtml(labelAd(key))}</h3><div class="copybox" id="ad_${key}">${escapeHtml(text)}</div><div class="actions"><button class="btn" onclick="copyAd('${key}')">Copier</button><button class="btn alt" onclick="shareAd('${key}')">Partager</button></div></article>`).join("");
}

function copyAd(key) {
  navigator.clipboard.writeText(AD_TEXTS[key]);
  alert("Texte copié.");
}

function shareAd(key) {
  const text = AD_TEXTS[key];
  if (navigator.share) navigator.share({ title: "Trouvéo Market", text, url: OFFICIAL_URL });
  else window.open("https://wa.me/?text=" + encodeURIComponent(text), "_blank");
}

render();
