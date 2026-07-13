// TROUVÉO MARKET — AMAZON PARTENAIRES BRANCHÉ
// ID Partenaire Amazon France : trouveomarket-21
// Les liens Amazon de la boutique incluent maintenant le tag partenaire.
// Règle : conserver une mention claire "liens affiliés" sur le site et les publications.
// Après 3 ventes éligibles, Amazon pourra examiner le site comme indiqué dans ton espace Partenaires.


const OFFICIAL_URL = "https://trouveo-market.netlify.app";

const AFFILIATE_HOSTS = ["amzn.to","amazon.fr","awin","linksynergy","tradetracker"];

function isAffiliateUrl(url){
  const raw = String(url || "").toLowerCase();
  return AFFILIATE_HOSTS.some(host => raw.includes(host)) || raw.includes("tag=trouveomarket-21");
}

function normalizeAffiliateItem(item){
  const next = {...item};
  if(isAffiliateUrl(next.url)){
    next.type = "product";
    if(!next.category || /bon plan/i.test(next.category)){
      next.category = "Affiliation / À classer";
    }
    next.cta = "Voir le produit";
    next.keywords = ((next.keywords || "") + " affiliation amazon boutique produit").trim();
  }
  return next;
}

const BASE_ITEMS = [{"type": "product", "title": "Support téléphone voiture", "category": "Auto / Tech", "price": "À comparer", "city": "France", "desc": "Support pratique pour GPS et téléphone en voiture.", "cta": "Voir produit", "url": "https://www.amazon.fr/s?k=support+t%C3%A9l%C3%A9phone+voiture&tag=trouveomarket-21", "keywords": "telephone voiture support gps auto tech"}, {"type": "product", "title": "Aspirateur voiture compact", "category": "Auto / Tech", "price": "À comparer", "city": "France", "desc": "Petit aspirateur pour garder l’intérieur de la voiture propre.", "cta": "Voir produit", "url": "https://www.amazon.fr/s?k=aspirateur+voiture+compact&tag=trouveomarket-21", "keywords": "aspirateur voiture auto nettoyage"}, {"type": "product", "title": "Organisateur coffre voiture", "category": "Auto / Rangement", "price": "À comparer", "city": "France", "desc": "Rangement simple pour courses, outils et accessoires voiture.", "cta": "Voir produit", "url": "https://www.amazon.fr/s?k=organisateur+coffre+voiture&tag=trouveomarket-21", "keywords": "organisateur coffre voiture rangement"}, {"type": "product", "title": "Chargeur USB-C voiture", "category": "Auto / Tech", "price": "À comparer", "city": "France", "desc": "Accessoire utile pour charger téléphone et appareils en déplacement.", "cta": "Voir produit", "url": "https://www.amazon.fr/s?k=chargeur+usb+c+voiture&tag=trouveomarket-21", "keywords": "chargeur usbc voiture auto tech"}, {"type": "product", "title": "Organisateur de câbles bureau", "category": "Bureau / Maison", "price": "À comparer", "city": "France", "desc": "Pour ranger les câbles et garder un bureau propre.", "cta": "Voir produit", "url": "https://www.amazon.fr/s?k=organisateur+c%C3%A2bles+bureau&tag=trouveomarket-21", "keywords": "bureau cables rangement maison"}, {"type": "product", "title": "Support ordinateur portable", "category": "Bureau / Tech", "price": "À comparer", "city": "France", "desc": "Pour améliorer la posture et libérer de l’espace sur le bureau.", "cta": "Voir produit", "url": "https://www.amazon.fr/s?k=support+ordinateur+portable&tag=trouveomarket-21", "keywords": "ordinateur portable support bureau tech"}, {"type": "product", "title": "Lampe de bureau LED", "category": "Bureau / Maison", "price": "À comparer", "city": "France", "desc": "Lampe utile pour travailler, lire et filmer proprement.", "cta": "Voir produit", "url": "https://www.amazon.fr/s?k=lampe+bureau+led&tag=trouveomarket-21", "keywords": "lampe bureau led maison"}, {"type": "product", "title": "Tapis de souris grand format", "category": "Bureau / Tech", "price": "À comparer", "city": "France", "desc": "Accessoire simple pour un bureau propre et confortable.", "cta": "Voir produit", "url": "https://www.amazon.fr/s?k=tapis+souris+grand+format&tag=trouveomarket-21", "keywords": "tapis souris bureau tech"}, {"type": "product", "title": "Boîtes de rangement pliables", "category": "Maison / Rangement", "price": "À comparer", "city": "France", "desc": "Ranger vêtements, papiers et objets du quotidien sans acheter un meuble.", "cta": "Voir produit", "url": "https://www.amazon.fr/s?k=boites+rangement+pliables&tag=trouveomarket-21", "keywords": "maison rangement boite pliable"}, {"type": "product", "title": "Étagère de rangement légère", "category": "Maison / Rangement", "price": "À comparer", "city": "France", "desc": "Solution simple pour organiser une pièce, un garage ou une buanderie.", "cta": "Voir produit", "url": "https://www.amazon.fr/s?k=%C3%A9tag%C3%A8re+rangement+l%C3%A9g%C3%A8re&tag=trouveomarket-21", "keywords": "etagere rangement maison"}, {"type": "product", "title": "Panier à linge pliable", "category": "Maison / Rangement", "price": "À comparer", "city": "France", "desc": "Produit quotidien utile, facile à présenter en vidéo.", "cta": "Voir produit", "url": "https://www.amazon.fr/s?k=panier+%C3%A0+linge+pliable&tag=trouveomarket-21", "keywords": "panier linge pliable maison"}, {"type": "product", "title": "Range-chaussures compact", "category": "Maison / Rangement", "price": "À comparer", "city": "France", "desc": "Pour optimiser l’entrée, la chambre ou un petit appartement.", "cta": "Voir produit", "url": "https://www.amazon.fr/s?k=range+chaussures+compact&tag=trouveomarket-21", "keywords": "range chaussures rangement maison"}, {"type": "product", "title": "Boîtes de conservation hermétiques", "category": "Cuisine / Maison", "price": "À comparer", "city": "France", "desc": "Pour organiser le frigo, les placards et limiter le gaspillage.", "cta": "Voir produit", "url": "https://www.amazon.fr/s?k=boites+conservation+hermetiques&tag=trouveomarket-21", "keywords": "cuisine conservation frigo maison"}, {"type": "product", "title": "Lunch box compartimentée", "category": "Cuisine / Maison", "price": "À comparer", "city": "France", "desc": "Pratique pour repas maison, travail, école ou sorties.", "cta": "Voir produit", "url": "https://www.amazon.fr/s?k=lunch+box+compartiment%C3%A9e&tag=trouveomarket-21", "keywords": "lunch box cuisine repas"}, {"type": "product", "title": "Égouttoir vaisselle compact", "category": "Cuisine / Maison", "price": "À comparer", "city": "France", "desc": "Produit utile pour petite cuisine ou plan de travail.", "cta": "Voir produit", "url": "https://www.amazon.fr/s?k=%C3%A9gouttoir+vaisselle+compact&tag=trouveomarket-21", "keywords": "egouttoir vaisselle cuisine"}, {"type": "product", "title": "Balance de cuisine numérique", "category": "Cuisine / Maison", "price": "À comparer", "city": "France", "desc": "Accessoire utile pour cuisiner avec précision.", "cta": "Voir produit", "url": "https://www.amazon.fr/s?k=balance+cuisine+num%C3%A9rique&tag=trouveomarket-21", "keywords": "balance cuisine numerique"}, {"type": "product", "title": "Ballon de football", "category": "Sport / Famille", "price": "À comparer", "city": "France", "desc": "Produit simple à promouvoir pour sport, loisirs et enfants.", "cta": "Voir produit", "url": "https://www.amazon.fr/s?k=ballon+football&tag=trouveomarket-21", "keywords": "ballon football sport"}, {"type": "product", "title": "Pompe à ballon manuelle", "category": "Sport / Famille", "price": "À comparer", "city": "France", "desc": "Accessoire pratique pour ballons de foot, basket ou volley.", "cta": "Voir produit", "url": "https://www.amazon.fr/s?k=pompe+%C3%A0+ballon+manuelle&tag=trouveomarket-21", "keywords": "pompe ballon sport"}, {"type": "product", "title": "Sac de sport compact", "category": "Sport / Famille", "price": "À comparer", "city": "France", "desc": "Produit utile pour entraînement, sorties et week-end.", "cta": "Voir produit", "url": "https://www.amazon.fr/s?k=sac+de+sport+compact&tag=trouveomarket-21", "keywords": "sac sport famille"}, {"type": "product", "title": "Gourde réutilisable", "category": "Sport / Famille", "price": "À comparer", "city": "France", "desc": "Accessoire pratique pour sport, école, travail ou sorties.", "cta": "Voir produit", "url": "https://www.amazon.fr/s?k=gourde+r%C3%A9utilisable&tag=trouveomarket-21", "keywords": "gourde reusable sport"}, {"type": "deal", "title": "Mise en avant commerçant local", "category": "Publicité partenaire", "price": "Formule personnalisée", "city": "Local / France", "desc": "Emplacement prévu pour commerçant, artisan ou service qui souhaite publier une offre.", "cta": "Demander une mise en avant", "url": "#merchant", "keywords": "commerce local publicité partenaire promo"}, {"type": "deal", "title": "Bon plan restaurant / commerce", "category": "Bon plan local", "price": "Offre à renseigner", "city": "Ville à définir", "desc": "Espace prévu pour une offre locale validée : restaurant, coiffeur, activité, boutique ou service.", "cta": "Proposer une offre", "url": "#merchant", "keywords": "restaurant commerce local promo offre"}, {"type": "service", "title": "Service local à promouvoir", "category": "Service", "price": "Sur devis", "city": "Ville à définir", "desc": "Fiche prête pour services locaux : réparation, nettoyage, artisan, livraison ou aide administrative.", "cta": "Contacter", "url": "#merchant", "keywords": "service artisan local devis"}];
const BASE_SUBS = [{"name": "Découverte", "price": "0 €", "desc": "Fiche simple en attente de validation, sans mise en avant."}, {"name": "Visible", "price": "10 €/mois", "desc": "Présence dans l’onglet Bons plans avec lien, ville et catégorie."}, {"name": "Boost", "price": "25 €/mois", "desc": "Mise en avant prioritaire + QR code offre + texte publicitaire."}, {"name": "Sur mesure", "price": "Personnalisé", "desc": "Formule négociée pour marché, association, commerce ou campagne locale."}];
const AD_TEXTS = {"client": "🔥 Trouvéo Market est lancé !\n\nUne seule plateforme pour découvrir :\n🛍️ des produits utiles\n📍 des bons plans autour de vous\n🏪 des commerçants locaux\n🎯 des offres partenaires\n📲 un accès rapide par QR code\n\nDécouvrez Trouvéo Market ici :\nhttps://trouveo-market.netlify.app", "merchant": "Vous êtes commerçant, artisan ou prestataire ?\n\nTrouvéo Market vous permet de proposer une offre, une promotion ou une mise en avant locale.\n\nObjectif :\n✅ gagner en visibilité\n✅ publier un bon plan\n✅ recevoir des demandes\n✅ apparaître dans une plateforme simple à partager par QR code\n\nDemandez votre mise en avant ici :\nhttps://trouveo-market.netlify.app", "tiktok": "Nouvelle idée locale 🚀\n\nUne seule plateforme pour chercher des produits utiles, découvrir des bons plans et mettre en avant les commerçants autour de vous.\n\nÇa s’appelle Trouvéo Market.\n\nBoutique + bons plans + commerçants + QR code.\nLien : https://trouveo-market.netlify.app\n\n#trouveo #bonsplans #commerceLocal #boutiqueenligne #startupfrance", "whatsapp": "Salut 👋\n\nJe te partage Trouvéo Market : une plateforme qui regroupe boutique, bons plans, offres locales et commerçants.\n\nLien : https://trouveo-market.netlify.app"};
const STORAGE_ITEMS_KEY = "trouveo_market_items_v4_amazon_catalogue";
const STORAGE_SUBS_KEY = "trouveo_market_subs_v4_amazon_catalogue";

function loadItemsWithBaseCatalog() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_ITEMS_KEY) || "null");
  if (!saved || !Array.isArray(saved) || saved.length === 0) {
    localStorage.setItem(STORAGE_ITEMS_KEY, JSON.stringify(BASE_ITEMS));
    return [...BASE_ITEMS];
  }

  const savedKeys = new Set(saved.map(i => (i.type || "") + "::" + (i.title || "")));
  const missingBaseItems = BASE_ITEMS.filter(i => !savedKeys.has((i.type || "") + "::" + (i.title || "")));
  const merged = [...missingBaseItems, ...saved];

  if (missingBaseItems.length > 0) {
    localStorage.setItem(STORAGE_ITEMS_KEY, JSON.stringify(merged));
  }

  return merged;
}

let items = loadItemsWithBaseCatalog();
let subs = JSON.parse(localStorage.getItem(STORAGE_SUBS_KEY) || "null") || BASE_SUBS;
let lastPosition = null;
function normalizeText(s){return (s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")}
function show(id){["market","shop","deals","nearby","merchant","subscriptions","publicity","owner"].forEach(x=>{const el=document.getElementById(x); if(el)el.classList.toggle("hidden",x!==id)}); save();
render();}
function filtered(type){const q=normalizeText(document.getElementById("q").value); const tf=document.getElementById("typeFilter").value; return items.filter(i=>(!type||i.type===type)&&(!tf||i.type===tf)&&(!q||normalizeText(i.title+" "+i.category+" "+i.city+" "+i.desc+" "+(i.keywords||"")).includes(q)));}
function mapsUrl(q, city){if(lastPosition)return `https://www.google.com/maps/search/${encodeURIComponent(q)}/@${lastPosition.lat},${lastPosition.lng},14z`; return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent((q||"commerce")+" "+(city||""));}
function actionUrl(i){
  const raw = String(i.url || "").trim();
  if(!raw) return mapsUrl(i.title, i.city);
  if(raw.startsWith("#merchant")) return OFFICIAL_URL + "/#merchant";
  if(/^https?:\/\//i.test(raw) || /^mailto:/i.test(raw) || /^tel:/i.test(raw)) return raw;
  if(/^[+0-9 .()\-]{6,}$/.test(raw)) return "tel:" + raw.replace(/[^+0-9]/g, "");
  if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) return "mailto:" + raw;
  return "https://www.google.com/search?q=" + encodeURIComponent(raw);
}
function card(i,idx){const label=i.type==="product"?"Boutique":i.type==="deal"?"Bon plan":"Service"; return `<article class="card"><div class="tag">${label} · ${i.category}</div><h3>${i.title}</h3><div class="price">${i.price}</div><p>${i.desc}</p><p><b>Zone :</b> ${i.city}</p><div class="actions"><a class="btn" target="_blank" href="${actionUrl(i)}">${i.cta||"Voir"}</a><a class="btn alt" target="_blank" href="${mapsUrl(i.title,i.city)}">Autour</a><button class="darkbtn ownerOnly" onclick="archiveItem(${idx})">Archiver</button></div></article>`;}
function render(){document.getElementById("shop").innerHTML=filtered("product").map((i,idx)=>card(i,idx)).join("")||"<p class='sub'>Aucun produit.</p>"; document.getElementById("deals").innerHTML=filtered("deal").map((i,idx)=>card(i,idx)).join("")||"<p class='sub'>Aucun bon plan.</p>"; document.getElementById("subsGrid").innerHTML=subs.map(s=>`<article class="card"><div class="tag">Formule</div><h3>${s.name}</h3><div class="price">${s.price}</div><p>${s.desc}</p><div class="actions"><button class="btn" onclick="selectPlan('${String(s.name).replace(/'/g,"\\'")}')">Choisir</button></div></article>`).join(""); renderNearbyCards(); renderAds();}
function selectPlan(name){show("merchant"); const sel=document.getElementById("mSub"); if(sel)sel.value=name;}
function submitMerchantLocal(){const title=document.getElementById("mName").value.trim(); if(!title)return alert("Nom du commerce obligatoire."); items.unshift({type:"deal",title,category:document.getElementById("mCategory").value,price:document.getElementById("mOffer").value||"Offre à valider",city:document.getElementById("mCity").value||"Local",desc:(document.getElementById("mDesc").value||"Demande commerçant à valider.")+" · Formule demandée : "+document.getElementById("mSub").value,cta:"Voir / contacter",url:document.getElementById("mLink").value||OFFICIAL_URL,keywords:"demande commerçant publicité partenaire"}); save(); alert("Demande ajoutée localement."); show("deals");}
function unlock(){if(document.getElementById("pin").value==="1234"){document.getElementById("app").classList.add("ownerOn"); document.getElementById("locked").style.display="none"; alert("Espace propriétaire déverrouillé."); render();}else alert("Code incorrect.");}
function addOwnerItem(){
  const title=document.getElementById("oTitle").value.trim();
  if(!title)return alert("Titre obligatoire.");

  const rawUrl=document.getElementById("oUrl").value.trim();
  const affiliate=isAffiliateUrl(rawUrl);
  const selectedType=document.getElementById("oType").value;

  const item={
    type: affiliate ? "product" : selectedType,
    title,
    category: document.getElementById("oCategory").value || (affiliate ? "Affiliation / À classer" : "À classer"),
    price: document.getElementById("oPrice").value || "À définir",
    city: document.getElementById("oCity").value || "France",
    desc: document.getElementById("oDesc").value || "",
    cta: affiliate ? "Voir le produit" : "Voir",
    url: rawUrl || mapsUrl(title,document.getElementById("oCity").value),
    keywords: title + (affiliate ? " affiliation amazon boutique produit" : "")
  };

  items.unshift(item);
  save();
  ["oTitle","oPrice","oCategory","oCity","oUrl","oDesc"].forEach(id=>document.getElementById(id).value="");
  render();

  if(affiliate){
    alert("Lien affilié détecté : ajouté automatiquement dans Boutique.");
    show("shop");
  }else{
    alert("Ajouté.");
  }
}
function addSubscription(){const name=document.getElementById("sName").value.trim(); if(!name)return alert("Nom de formule obligatoire."); subs.push({name,price:document.getElementById("sPrice").value||"Sur mesure",desc:document.getElementById("sDesc").value||"Formule personnalisée."}); save(); ["sName","sPrice","sDesc"].forEach(id=>document.getElementById(id).value=""); render();}
function archiveItem(idx){if(!confirm("Archiver cet élément localement ?"))return; items.splice(idx,1); save(); render();}
function exportItems(){const blob=new Blob([JSON.stringify({items,subs},null,2)],{type:"application/json"}); const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="trouveo_market_donnees.json"; a.click(); URL.revokeObjectURL(a.href);}
function save(){localStorage.setItem("trouveo_market_items_v3",JSON.stringify(items)); localStorage.setItem("trouveo_market_subs_v3",JSON.stringify(subs));}
function showQR(){document.getElementById("qrBox").classList.remove("hidden"); document.getElementById("qrImg").src="assets/qr-trouveo-market.png";}
function downloadQR(){const a=document.createElement("a"); a.href="assets/qr-trouveo-market.png"; a.download="QR_Trouveo_Market.png"; a.click();}
function copyLink(){navigator.clipboard.writeText(OFFICIAL_URL); alert("Lien officiel copié.");}
function openNearby(){const q=document.getElementById("nearbyQuery").value||document.getElementById("q").value||"bons plans"; const city=document.getElementById("nearbyCity").value||""; window.open(mapsUrl(q,city),"_blank");}
function renderNearbyCards(){const presets=["restaurant","téléphone","supermarché","coiffeur","garage","bricolage","électroménager","pharmacie"]; const city=document.getElementById("nearbyCity")?.value||""; document.getElementById("nearbyCards").innerHTML=presets.map(p=>`<article class="card"><div class="tag">Autour</div><h3>${p}</h3><p>Recherche rapide autour de toi ou de la ville indiquée.</p><div class="actions"><a class="btn alt" target="_blank" href="${mapsUrl(p,city)}">Ouvrir Maps</a></div></article>`).join("");}
function useGeo(){const box=document.getElementById("locationStatus"); box.classList.remove("hidden"); if(!navigator.geolocation){box.textContent="Géolocalisation non disponible sur ce navigateur."; return;} box.textContent="Demande de localisation en cours…"; navigator.geolocation.getCurrentPosition(pos=>{lastPosition={lat:pos.coords.latitude,lng:pos.coords.longitude}; box.textContent="Position détectée. Les boutons Autour utilisent maintenant ta position."; show("nearby"); render();},()=>{box.textContent="Localisation refusée ou bloquée. Tu peux utiliser une ville manuellement.";});}
function startVoice(){const SR=window.SpeechRecognition||window.webkitSpeechRecognition; if(!SR)return alert("Le micro vocal n’est pas compatible avec ce navigateur. Essaie Chrome."); const rec=new SR(); rec.lang="fr-FR"; rec.interimResults=false; rec.onresult=e=>{document.getElementById("q").value=e.results[0][0].transcript; render();}; rec.onerror=()=>alert("Micro bloqué ou refusé. Autorise le micro dans le navigateur."); rec.start();}
function labelAd(k){return {client:"Texte client",merchant:"Texte commerçant",tiktok:"Script TikTok",whatsapp:"Message WhatsApp"}[k]||k;}
function renderAds(){const box=document.getElementById("adTexts"); if(!box)return; box.innerHTML=Object.entries(AD_TEXTS).map(([key,text])=>`<article class="card"><div class="tag">Publicité</div><h3>${labelAd(key)}</h3><div class="copybox" id="ad_${key}">${text}</div><div class="actions"><button class="btn" onclick="copyAd('${key}')">Copier</button><button class="btn alt" onclick="shareAd('${key}')">Partager</button></div></article>`).join("");}
function copyAd(key){navigator.clipboard.writeText(AD_TEXTS[key]); alert("Texte copié.");}
function shareAd(key){const text=AD_TEXTS[key]; if(navigator.share)navigator.share({title:"Trouvéo Market",text,url:OFFICIAL_URL}); else window.open("https://wa.me/?text="+encodeURIComponent(text),"_blank");}
render();
