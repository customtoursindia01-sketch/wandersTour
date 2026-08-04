// ==========================================================================
// Wander India Tours — tour-detail.js (tour-detail.html?id=...)
// ==========================================================================

document.addEventListener("DOMContentLoaded", async () => {
  const id = qs("id");
  const section = document.getElementById("tourDetailSection");

  if (!id) {
    section.innerHTML = '<div class="container"><p class="empty-text">No tour specified. <a href="tours.html">Browse all tours</a>.</p></div>';
    return;
  }

  try {
    const [settings, tour, allTours] = await Promise.all([
      api("/settings"),
      api(`/tours/${id}`),
      api("/tours"),
    ]);
    applySettingsToDom(settings);
    renderTourDetail(tour);
    renderRelatedTours(allTours, tour);
  } catch (error) {
    console.error("Failed to load tour:", error);
    section.innerHTML = '<div class="container"><p class="empty-text">This tour could not be found. <a href="tours.html">Browse all tours</a>.</p></div>';
  }
});

function renderTourDetail(t) {
  document.title = `${t.title} | Wander India Tours`;
  document.getElementById("pageHeading").textContent = t.title;
  document.getElementById("breadcrumbTitle").textContent = t.title;

  const section = document.getElementById("tourDetailSection");
  section.innerHTML = `
    <div class="container">
      <div class="tour-detail-layout">
        <div>
          <div class="tour-detail-gallery">
            <img src="${t.image}" alt="${t.title}">
          </div>
          <div class="tour-detail-meta">
            <div class="meta-item"><strong>${t.duration}</strong>Duration</div>
            <div class="meta-item"><strong>${t.route}</strong>Route</div>
            <div class="meta-item"><strong>${t.category}</strong>Category</div>
          </div>
          <div class="prose">
            <h2>Overview</h2>
            <p>${t.description || `Explore ${t.route} on this private, guided itinerary. Every Wander India Tours package includes a dedicated driver, hand-picked accommodation as per your preference, and a certified local guide who brings each stop to life.`}</p>
            <h3>What's Included</h3>
            <ul>
              <li>Private air-conditioned vehicle with an experienced driver</li>
              <li>Certified English-speaking local guide at each major sight</li>
              <li>All monument entry fees as per the itinerary</li>
              <li>24/7 on-ground support for the duration of your trip</li>
            </ul>
            <h3>Not Included</h3>
            <ul>
              <li>International and domestic flights</li>
              <li>Personal expenses and travel insurance</li>
              <li>Meals not specified in the itinerary</li>
            </ul>
          </div>
        </div>

        <div class="booking-box">
          <div class="price-tag">${formatPrice(t.price, t.currency)} <span>per person</span></div>
          <p>Prices are indicative and vary with group size, season and accommodation category. Get a firm quote in under 24 hours.</p>
          <a href="contact.html" class="btn btn-primary btn-block" style="justify-content:center;margin-top:10px;">Enquire About This Tour</a>
          <a class="btn btn-outline-dark btn-block" style="justify-content:center;margin-top:10px;" id="whatsappEnquire" href="#" target="_blank" rel="noopener">Chat on WhatsApp</a>
        </div>
      </div>
    </div>
  `;

  api("/settings").then((settings) => {
    const link = document.getElementById("whatsappEnquire");
    if (link) link.href = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(`Hi! I'd like more information about the "${t.title}" tour.`)}`;
  });
}

function renderRelatedTours(allTours, current) {
  const related = allTours.filter((t) => t.category === current.category && t._id !== current._id).slice(0, 3);
  if (!related.length) return;

  document.getElementById("relatedSection").style.display = "";
  document.getElementById("relatedGrid").innerHTML = related
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
}
