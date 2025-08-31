async function loadTutorials() {
  const res = await fetch('tutorials.json');
  const tutorials = await res.json();
  const results = document.getElementById('results');
  results.innerHTML = '';
  let searchVal = document.getElementById('search').value.toLowerCase();
  let domainVal = document.getElementById('domainFilter').value;
  let typeVal = document.getElementById('typeFilter').value;
  let levelVal = document.getElementById('levelFilter').value;
  let yearVal = document.getElementById('yearFilter').value;

  let domains = new Set(), types = new Set(), levels = new Set(), years = new Set();
  tutorials.forEach(t => {
    (t.domain||[]).forEach(d => domains.add(d));
    (t.type||[]).forEach(tp => types.add(tp));
    (t.level||[]).forEach(l => levels.add(l));
    if (t.year) years.add(t.year);
  });

  const populateFilter = (id, set) => {
    let sel = document.getElementById(id);
    if (sel.options.length === 1) {
      Array.from(set).sort().forEach(val => {
        let opt = document.createElement('option');
        opt.value = val; opt.textContent = val;
        sel.appendChild(opt);
      });
    }
  };
  populateFilter('domainFilter', domains);
  populateFilter('typeFilter', types);
  populateFilter('levelFilter', levels);
  populateFilter('yearFilter', years);

  tutorials.filter(t => {
    let match = true;
    if (searchVal && !t.title.toLowerCase().includes(searchVal)) match = false;
    if (domainVal && !(t.domain||[]).includes(domainVal)) match = false;
    if (typeVal && !(t.type||[]).includes(typeVal)) match = false;
    if (levelVal && !(t.level||[]).includes(levelVal)) match = false;
    if (yearVal && t.year != yearVal) match = false;
    return match;
  }).forEach(t => {
    let card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h3>${t.title}</h3>
      <p><b>Speaker:</b> ${t.speaker||'Unknown'}</p>
      <p><b>Platform:</b> ${t.platform||'N/A'}</p>
      <p><b>Domain:</b> ${(t.domain||[]).join(', ')}</p>
      <p><b>Type:</b> ${(t.type||[]).join(', ')}</p>
      <p><b>Level:</b> ${(t.level||[]).join(', ')}</p>
      <p><b>Year:</b> ${t.year||''}</p>
      <a href="${t.url}" target="_blank">Watch</a>`;
    results.appendChild(card);
  });
}

document.getElementById('search').addEventListener('input', loadTutorials);
['domainFilter','typeFilter','levelFilter','yearFilter'].forEach(id => {
  document.getElementById(id).addEventListener('change', loadTutorials);
});

loadTutorials();
