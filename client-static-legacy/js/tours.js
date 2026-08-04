// ==========================================================================
// Wander India Tours — tours.js (tours.html — full listing with tabs)
// ==========================================================================

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const [settings, tours] = await Promise.all([api("/settings"), api("/tours")]);
    applySettingsToDom(settings);
    renderTours(tours, qs("category"));
  } catch (error) {
    console.error("Failed to load tours from the API:", error);
    document.getElementById("tabsNav").innerHTML =
      '<p class="loading-text">Could not load tours. Is the backend server running?</p>';
  }
});

function renderTours(tours, preselectCategory) {
  const tabsNav = document.getElementById("tabsNav");
  const panelsWrap = document.getElementById("tabPanels");
  if (!tabsNav || !panelsWrap) return;

  if (!tours.length) {
    panelsWrap.innerHTML = '<p class="empty-text">No tour packages published yet.</p>';
    return;
  }

  const categories = [...new Set(tours.map((t) => t.category))];
  const activeIndex = preselectCategory && categories.includes(preselectCategory)
    ? categories.indexOf(preselectCategory)
    : 0;

  tabsNav.innerHTML = categories
    .map((cat, i) => `<button class="tab-btn ${i === activeIndex ? "active" : ""}" data-tab="tab-${slugify(cat)}">${cat}</button>`)
    .join("");

  panelsWrap.innerHTML = categories
    .map((cat, i) => {
      const cards = tours
        .filter((t) => t.category === cat)
        .map(
          (t) => `
        <article class="tour-card">
          <div class="tour-media">
            <span class="tour-duration">${t.duration}</span>
            <img src="${t.image}" alt="${t.title}" loading="lazy">
          </div>
          <div class="tour-body">
            <h4>${t.title}</h4>
            <div class="tour-route">📍 ${t.route}</div>
            <div class="tour-footer">
              <div class="tour-price"><span class="from">Starting from</span><span class="amount">${formatPrice(t.price, t.currency)}</span></div>
              <a href="tour-detail.html?id=${t._id}" class="btn btn-primary-dark btn-sm">View Tour</a>
            </div>
          </div>
        </article>`
        )
        .join("");
      return `<div class="tab-panel ${i === activeIndex ? "active" : ""}" id="tab-${slugify(cat)}"><div class="tour-grid">${cards}</div></div>`;
    })
    .join("");

  initTabs();
}
