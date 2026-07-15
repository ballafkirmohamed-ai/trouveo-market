// TROUVÉO MARKET — RECHERCHE HONNÊTE MULTI-SITES
(() => {
  const SOURCE_BUILDERS = [
    {name:"Amazon France", build:q=>`https://www.amazon.fr/s?k=${encodeURIComponent(q)}`},
    {name:"AliExpress", build:q=>`https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(q)}`},
    {name:"Jumia Maroc", build:q=>`https://www.jumia.ma/catalog/?q=${encodeURIComponent(q)}`},
    {name:"Leboncoin", build:q=>`https://www.leboncoin.fr/recherche?text=${encodeURIComponent(q)}`},
    {name:"Google Shopping", build:q=>`https://www.google.com/search?tbm=shop&q=${encodeURIComponent(q)}`}
  ];

  const clean = value => String(value || "").replace(/[<>`]/g, "").trim();

  function currentQuery() {
    return clean(document.getElementById("dealQuery")?.value || document.getElementById("q")?.value || "");
  }

  function sourceCards(query) {
    if (!query) {
      return '<div class="notice">Saisis un produit, par exemple « frigo », puis choisis le site à consulter. Trouvéo n’annonce pas automatiquement le meilleur prix tant que les catalogues partenaires ne sont pas connectés.</div>';
    }
    return `<div class="grid source-grid">${SOURCE_BUILDERS.map(source => `
      <article class="card compact source-card">
        <div class="tag">Recherche externe</div>
        <h3>${source.name}</h3>
        <p>Voir les offres actuellement affichées pour <b>${query.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</b>.</p>
        <a class="btn" href="${source.build(query)}" target="_blank" rel="noopener noreferrer sponsored">Ouvrir ${source.name}</a>
      </article>`).join("")}</div>`;
  }

  function renderHonestDeals() {
    const section = document.getElementById("deals");
    if (!section) return;
    const query = currentQuery();
    section.innerHTML = `
      <div class="section honest-search-panel">
        <div class="tag">Recherche multi-sites</div>
        <h2>Comparer manuellement les offres</h2>
        <p class="sub">Cette version ouvre les recherches Amazon, AliExpress, Jumia Maroc, Leboncoin et Google Shopping. Elle ne calcule pas encore automatiquement le prix le plus bas.</p>
        <div class="toolbar">
          <input id="dealQuery" value="${query.replace(/&/g,"&amp;").replace(/"/g,"&quot;")}" placeholder="Exemple : frigo, téléphone, poussette…">
          <button id="dealSearchButton">Afficher les sources</button>
        </div>
        <div id="sourceResults">${sourceCards(query)}</div>
      </div>`;

    const input = document.getElementById("dealQuery");
    const button = document.getElementById("dealSearchButton");
    const refresh = () => {
      const q = currentQuery();
      document.getElementById("sourceResults").innerHTML = sourceCards(q);
    };
    button?.addEventListener("click", refresh);
    input?.addEventListener("keydown", event => {
      if (event.key === "Enter") refresh();
    });
  }

  function runMainSearch() {
    const q = clean(document.getElementById("q")?.value);
    if (!q) {
      document.getElementById("q")?.focus();
      return;
    }
    document.querySelector('[data-section="shop"]')?.click();
  }

  document.getElementById("searchButton")?.addEventListener("click", runMainSearch);
  document.getElementById("q")?.addEventListener("keydown", event => {
    if (event.key === "Enter") runMainSearch();
  });

  document.querySelector('[data-section="deals"]')?.addEventListener("click", () => setTimeout(renderHonestDeals, 0));
  document.getElementById("q")?.addEventListener("input", () => setTimeout(renderHonestDeals, 0));
  document.getElementById("typeFilter")?.addEventListener("change", () => setTimeout(renderHonestDeals, 0));

  renderHonestDeals();
})();
