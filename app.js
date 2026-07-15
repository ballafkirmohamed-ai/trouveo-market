// TROUVÉO MARKET — VERSION OFFICIELLE
const OFFICIAL_URL = "https://trouveo-mark.netlify.app";
const PUBLIC_SECTIONS = ["market","shop","deals","nearby"];
const BASE_PRODUCTS = [
  {
    "type": "product",
    "title": "SAVANA – Lemmings, jeu coopératif familial",
    "category": "Jeux / Famille",
    "price": "Voir le prix sur Amazon",
    "city": "France",
    "desc": "Jeu coopératif familial pour partager des parties rapides.",
    "cta": "Voir sur Amazon",
    "url": "https://amzn.to/3RD1Meh",
    "keywords": "jeu famille savana lemmings coopératif",
    "asin": "B0H38V6B15"
  },
  {
    "type": "product",
    "title": "Rowenta X-Pert 6.60 – Aspirateur multifonction",
    "category": "Maison / Entretien",
    "price": "Voir le prix sur Amazon",
    "city": "France",
    "desc": "Aspirateur balai multifonction pour l’entretien quotidien.",
    "cta": "Voir sur Amazon",
    "url": "https://amzn.to/451G46M",
    "keywords": "rowenta aspirateur maison entretien",
    "asin": "B0D9PQD5V4"
  },
  {
    "type": "product",
    "title": "Piège à moustiques électrique silencieux",
    "category": "Maison / Extérieur",
    "price": "Voir le prix sur Amazon",
    "city": "France",
    "desc": "Solution électrique silencieuse contre les moustiques.",
    "cta": "Voir sur Amazon",
    "url": "https://amzn.to/4vus40b",
    "keywords": "moustique électrique extérieur maison",
    "asin": "B0GKGC5RYJ"
  },
  {
    "type": "product",
    "title": "Blendura – Balance numérique portable pour bagages",
    "category": "Voyage / Accessoires",
    "price": "Voir le prix sur Amazon",
    "city": "France",
    "desc": "Balance compacte pour contrôler le poids des valises.",
    "cta": "Voir sur Amazon",
    "url": "https://amzn.to/3T1Pe0n",
    "keywords": "voyage bagage balance valise",
    "asin": "B0DFGF6R1Y"
  },
  {
    "type": "product",
    "title": "RUIMEN – Montre connectée multifonction",
    "category": "High-Tech / Montres",
    "price": "Voir le prix sur Amazon",
    "city": "France",
    "desc": "Smartwatch avec fonctions sport, chronomètre et suivi d’activité.",
    "cta": "Voir sur Amazon",
    "url": "https://amzn.to/4fv6y6J",
    "keywords": "smartwatch montre connectée sport",
    "asin": "B0BL27BC6G"
  },
  {
    "type": "product",
    "title": "Miracase – Support téléphone voiture 360°",
    "category": "Auto / Accessoires",
    "price": "Voir le prix sur Amazon",
    "city": "France",
    "desc": "Support téléphone puissant et orientable pour voiture.",
    "cta": "Voir sur Amazon",
    "url": "https://amzn.to/4wEKAnB",
    "keywords": "auto voiture support téléphone smartphone",
    "asin": "B0G1T39544"
  },
  {
    "type": "product",
    "title": "FOMYHEARD – Tire-lait électrique rechargeable",
    "category": "Bébé / Maternité",
    "price": "Voir le prix sur Amazon",
    "city": "France",
    "desc": "Tire-lait portable rechargeable avec intensité réglable.",
    "cta": "Voir sur Amazon",
    "url": "https://amzn.to/3SZIjoz",
    "keywords": "bébé maternité allaitement tire lait",
    "asin": "B0DQL5PN3C"
  },
  {
    "type": "product",
    "title": "DREO – Ventilateur colonne avec télécommande",
    "category": "Maison / Confort",
    "price": "Voir le prix sur Amazon",
    "city": "France",
    "desc": "Ventilateur colonne pour améliorer le confort à la maison.",
    "cta": "Voir sur Amazon",
    "url": "https://amzn.to/4aPUhHk",
    "keywords": "ventilateur maison confort été",
    "asin": "B0DRNFB95M"
  },
  {
    "type": "product",
    "title": "INIU – Batterie externe 10 000 mAh",
    "category": "High-Tech / Énergie",
    "price": "Voir le prix sur Amazon",
    "city": "France",
    "desc": "Powerbank compacte pour recharger les appareils mobiles.",
    "cta": "Voir sur Amazon",
    "url": "https://amzn.to/3Tec84H",
    "keywords": "batterie externe powerbank téléphone",
    "asin": "B0DC93Z911"
  },
  {
    "type": "product",
    "title": "Aioneus – Chargeur secteur USB-C",
    "category": "High-Tech / Chargeurs",
    "price": "Voir le prix sur Amazon",
    "city": "France",
    "desc": "Adaptateur secteur USB-C compatible avec de nombreux smartphones.",
    "cta": "Voir sur Amazon",
    "url": "https://amzn.to/4yhRj8u",
    "keywords": "chargeur usb c samsung smartphone",
    "asin": "B0CYSQPXDV"
  },
  {
    "type": "product",
    "title": "Biodance – Bio Collagen Real Deep Mask",
    "category": "Beauté / Visage",
    "price": "Voir le prix sur Amazon",
    "city": "France",
    "desc": "Masque de soin du visage au collagène.",
    "cta": "Voir sur Amazon",
    "url": "https://amzn.to/4eWjane",
    "keywords": "beauté masque visage collagène",
    "asin": "B0B2RM68G2"
  },
  {
    "type": "product",
    "title": "HOVVIDA – Éclairage LED avec télécommande",
    "category": "Maison / Éclairage",
    "price": "Voir le prix sur Amazon",
    "city": "France",
    "desc": "Éclairage décoratif avec télécommande et minuterie.",
    "cta": "Voir sur Amazon",
    "url": "https://amzn.to/3SP4aix",
    "keywords": "led éclairage décoration maison",
    "asin": "B0CQQ6R3G4"
  },
  {
    "type": "product",
    "title": "Apple AirTag",
    "category": "High-Tech / Localisation",
    "price": "Voir le prix sur Amazon",
    "city": "France",
    "desc": "Traceur pour retrouver clés, sac, portefeuille ou bagages.",
    "cta": "Voir sur Amazon",
    "url": "https://amzn.to/4fmFq8W",
    "keywords": "airtag apple localisation bagage clés",
    "asin": "B0GJTCB2QM"
  },
  {
    "type": "product",
    "title": "TP-Link Tapo C210 – Caméra intérieure 2K",
    "category": "Maison connectée / Sécurité",
    "price": "Voir le prix sur Amazon",
    "city": "France",
    "desc": "Caméra Wi-Fi intérieure avec rotation 360° et audio bidirectionnel.",
    "cta": "Voir sur Amazon",
    "url": "https://amzn.to/4gwqtDj",
    "keywords": "caméra sécurité maison connectée tapo",
    "asin": "B095CLQ1PT"
  },
  {
    "type": "product",
    "title": "Thermomètre frontal infrarouge",
    "category": "Santé / Bien-être",
    "price": "Voir le prix sur Amazon",
    "city": "France",
    "desc": "Thermomètre numérique frontal sans contact.",
    "cta": "Voir sur Amazon",
    "url": "https://amzn.to/3SQhFOW",
    "keywords": "santé thermomètre frontal infrarouge",
    "asin": "B0CKXCDC4M"
  },
  {
    "type": "product",
    "title": "L’Oréal Professionnel – Shampoing réparateur",
    "category": "Beauté / Cheveux",
    "price": "Voir le prix sur Amazon",
    "city": "France",
    "desc": "Shampoing professionnel pour cheveux abîmés.",
    "cta": "Voir sur Amazon",
    "url": "https://amzn.to/4fmFvtg",
    "keywords": "beauté cheveux shampoing l'oréal",
    "asin": "B094DHJ3X3"
  },
  {
    "type": "product",
    "title": "Ventilateur portable pour poussette – 5 200 mAh",
    "category": "Bébé / Accessoires",
    "price": "Voir le prix sur Amazon",
    "city": "France",
    "desc": "Ventilateur rechargeable et orientable pour poussette.",
    "cta": "Voir sur Amazon",
    "url": "https://amzn.to/44xdyK6",
    "keywords": "bébé poussette ventilateur été",
    "asin": "B0BXKL1DF2"
  },
  {
    "type": "product",
    "title": "Blink – Sonnette vidéo 2K sur batterie",
    "category": "Maison connectée / Sécurité",
    "price": "Voir le prix sur Amazon",
    "city": "France",
    "desc": "Sonnette vidéo connectée avec détection et notifications.",
    "cta": "Voir sur Amazon",
    "url": "https://amzn.to/3QT9JMh",
    "keywords": "blink sonnette vidéo sécurité",
    "asin": "B0G62ZMTPD"
  },
  {
    "type": "product",
    "title": "Blink Mini 2 – Caméra connectée 2K",
    "category": "Maison connectée / Sécurité",
    "price": "Voir le prix sur Amazon",
    "city": "France",
    "desc": "Caméra compacte pour surveiller l’intérieur de la maison.",
    "cta": "Voir sur Amazon",
    "url": "https://amzn.to/4wMnL1v",
    "keywords": "blink caméra 2k maison sécurité",
    "asin": "B0F3BDBWK2"
  },
  {
    "type": "product",
    "title": "Scozzi – Support universel pour smartphone",
    "category": "Auto / Accessoires",
    "price": "Voir le prix sur Amazon",
    "city": "France",
    "desc": "Support universel pour smartphone, pratique en déplacement.",
    "cta": "Voir sur Amazon",
    "url": "https://amzn.to/3ThINq1",
    "keywords": "support smartphone téléphone auto",
    "asin": "B07YN2FZJH"
  },
  {
    "type": "product",
    "title": "POPERFUN – Ventilateur poussette 10 000 mAh",
    "category": "Bébé / Accessoires",
    "price": "Voir le prix sur Amazon",
    "city": "France",
    "desc": "Ventilateur rechargeable longue autonomie pour poussette.",
    "cta": "Voir sur Amazon",
    "url": "https://amzn.to/4w1S841",
    "keywords": "bébé poussette ventilateur 10000mah",
    "asin": "B0DXFHCTK9"
  },
  {
    "type": "product",
    "title": "Amazon Echo Show 5 – 3e génération",
    "category": "Maison connectée / Assistants",
    "price": "Voir le prix sur Amazon",
    "city": "France",
    "desc": "Écran connecté avec Alexa pour la maison.",
    "cta": "Voir sur Amazon",
    "url": "https://amzn.to/4yfN11H",
    "keywords": "echo show alexa maison connectée",
    "asin": "B09B2S8WKD"
  }
];
const BASE_DEALS = [
  {type:"deal",title:"Restaurant autour de moi",category:"Bons plans locaux",price:"À consulter",city:"France",desc:"Rechercher des restaurants proches.",cta:"Ouvrir Maps",url:"",keywords:"restaurant local"},
  {type:"deal",title:"Chocolatier autour de moi",category:"Bons plans locaux",price:"À consulter",city:"France",desc:"Rechercher une chocolaterie proche.",cta:"Ouvrir Maps",url:"",keywords:"chocolatier chocolaterie local"},
  {type:"deal",title:"Pharmacie autour de moi",category:"Services utiles",price:"À consulter",city:"France",desc:"Rechercher une pharmacie proche.",cta:"Ouvrir Maps",url:"",keywords:"pharmacie santé local"}
];

function text(v){return String(v??"").replace(/<[^>]*>/g,"").replace(/[<>"'`]/g,"").trim()}
function esc(v){return text(v).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}
function norm(v){return String(v||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")}
function safeUrl(v){const s=String(v||"").trim();return /^https:\/\//i.test(s)?s:""}
function dedupe(list){
  const seen=new Set(); return list.filter(item=>{const key=item.asin||safeUrl(item.url)||norm(item.title); if(!key||seen.has(key))return false;seen.add(key);return true})
}
const items=dedupe([...BASE_PRODUCTS,...BASE_DEALS]);
let lastPosition=null;

function show(id){PUBLIC_SECTIONS.forEach(n=>document.getElementById(n)?.classList.toggle("hidden",n!==id));render()}
function filtered(type){const q=norm(document.getElementById("q")?.value);const tf=document.getElementById("typeFilter")?.value||"";return items.filter(i=>(!type||i.type===type)&&(!tf||i.type===tf)&&(!q||norm(`${i.title} ${i.category} ${i.desc} ${i.keywords}`).includes(q)))}
function mapsUrl(q,city){const query=[q,city].filter(Boolean).join(" ")||"commerce";return lastPosition?`https://www.google.com/maps/search/${encodeURIComponent(query)}/@${lastPosition.lat},${lastPosition.lng},14z`:`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`}
function card(i){const url=i.type==="product"?safeUrl(i.url):mapsUrl(i.title,i.city);const visual=i.type==="product"?`<div class="product-visual" aria-hidden="true">${esc(i.title).slice(0,1)}</div>`:"";return `<article class="card">${visual}<div class="tag">${esc(i.type==="product"?"Boutique · "+i.category:"Bon plan · "+i.category)}</div><h3>${esc(i.title)}</h3><div class="price">${esc(i.price)}</div><p>${esc(i.desc)}</p><div class="actions"><a class="btn" href="${url}" target="_blank" rel="noopener noreferrer sponsored">${esc(i.cta||"Voir")}</a>${i.type==="product"?`<a class="btn alt" href="${mapsUrl(i.title,"")}" target="_blank" rel="noopener noreferrer">Autour</a>`:""}</div></article>`}
function render(){const s=document.getElementById("shop"),d=document.getElementById("deals");if(s)s.innerHTML=filtered("product").map(card).join("")||"<p>Aucun produit trouvé.</p>";if(d)d.innerHTML=filtered("deal").map(card).join("");renderNearbyCards()}
function showQR(){document.getElementById("qrBox")?.classList.remove("hidden")}
function downloadQR(){const a=document.createElement("a");a.href="assets/qr-trouveo-market.png";a.download="QR_Trouveo_Market.png";a.click()}
function copyLink(){navigator.clipboard?.writeText(OFFICIAL_URL);alert("Lien officiel copié.")}
function searchNearby(t){window.open(mapsUrl(t,document.getElementById("nearbyCity")?.value||""),"_blank","noopener,noreferrer")}
function openNearby(){searchNearby(document.getElementById("nearbyQuery")?.value||"bons plans")}
function renderNearbyCards(){const b=document.getElementById("nearbyCards");if(!b)return;const p=["restaurant","chocolatier","supermarché","téléphone","coiffeur","garage","bricolage","électroménager","pharmacie"];b.innerHTML=p.map(x=>`<article class="card compact"><div class="tag">Autour</div><h3>${esc(x)}</h3><button class="btn alt nearby-search" data-query="${esc(x)}">Ouvrir Maps</button></article>`).join("")}
function useGeo(){const b=document.getElementById("locationStatus");b?.classList.remove("hidden");if(!navigator.geolocation){if(b)b.textContent="Géolocalisation indisponible.";return}if(b)b.textContent="Demande de localisation…";navigator.geolocation.getCurrentPosition(p=>{lastPosition={lat:p.coords.latitude.toFixed(6),lng:p.coords.longitude.toFixed(6)};if(b)b.textContent="Position détectée. Les recherches utilisent maintenant votre localisation.";show("nearby")},e=>{if(b)b.textContent=e.code===1?"Localisation refusée : saisissez une ville.":"Localisation indisponible : réessayez ou saisissez une ville."},{enableHighAccuracy:true,timeout:15000,maximumAge:0})}
function startVoice(){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR)return alert("Utilisez Chrome pour la recherche vocale.");const r=new SR();r.lang="fr-FR";r.onresult=e=>{document.getElementById("q").value=e.results[0][0].transcript;show("shop")};r.onerror=()=>alert("Micro refusé ou indisponible.");r.start()}
document.querySelectorAll("[data-section]").forEach(b=>b.addEventListener("click",()=>show(b.dataset.section)));
document.getElementById("showQrButton")?.addEventListener("click",showQR);
document.getElementById("downloadQrButton")?.addEventListener("click",downloadQR);
document.getElementById("copyLinkButton")?.addEventListener("click",copyLink);
document.getElementById("voiceButton")?.addEventListener("click",startVoice);
document.getElementById("geoButton")?.addEventListener("click",useGeo);
document.getElementById("geoNearbyButton")?.addEventListener("click",useGeo);
document.getElementById("openNearbyButton")?.addEventListener("click",openNearby);
document.getElementById("q")?.addEventListener("input",render);
document.getElementById("typeFilter")?.addEventListener("change",render);
document.getElementById("nearbyCards")?.addEventListener("click",e=>{const b=e.target.closest(".nearby-search");if(b)searchNearby(b.dataset.query)});
show("market");render();
