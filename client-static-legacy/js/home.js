// ==========================================================================
// Wander India Tours — home.js (index.html only)
// ==========================================================================

document.addEventListener("DOMContentLoaded", async () => {
  initItineraryForm(); // no-op here (no form on home), kept for consistency

  try {
    const [settings, stats, tours, destinations, themes, testimonials, blog] = await Promise.all([
      api("/settings"),
      api("/stats"),
      api("/tours"),
      api("/destinations"),
      api("/themes"),
      api("/testimonials"),
      api("/blog"),
    ]);

    applySettingsToDom(settings);
    renderStats(stats);
    renderFeaturedTours(tours.slice(0, 3));
    renderDestinations(destinations.slice(0, 4));
    renderThemes(themes);
    renderTestimonials(testimonials);
    renderBlog(blog.slice(0, 3));

    initCounters();
  } catch (error) {
    console.error("Failed to load homepage content from the API:", error);
    document.querySelectorAll(".loading-text").forEach((el) => {
      el.textContent = "Could not load content. Is the backend server running?";
    });
  }
});

function renderStats(stats) {
  const map = {
    happyTravelers: "Happy Travelers",
    tourPackages: "Tour Packages",
    destinationsCovered: "Destinations Covered",
    yearsOfExperience: "Years of Experience",
  };
  const container = document.getElementById("statsCard");
  if (!container) return;
  container.innerHTML = Object.entries(map)
    .map(
      ([key, label]) => `
      <div class="stat">
        <div class="stat-number" data-count="${stats[key] ?? 0}">0</div>
        <div class="stat-label">${label}</div>
      </div>`
    )
    .join("");
}

function renderFeaturedTours(tours) {
  const grid = document.getElementById("featuredToursGrid");
  if (!grid) return;
  if (!tours.length) {
    grid.innerHTML = '<p class="empty-text">No tour packages published yet.</p>';
    return;
  }
  grid.innerHTML = tours
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

function renderDestinations(destinations) {
  const grid = document.getElementById("destGrid");
  if (!grid) return;
  if (!destinations.length) {
    grid.innerHTML = '<p class="empty-text">No destinations published yet.</p>';
    return;
  }
  grid.innerHTML = destinations
    .map(
      (d) => `
    <a class="dest-card" href="tours.html">
      <img src="${d.image}" alt="${d.name}" loading="lazy">
      <div class="dest-overlay"><div><span>${d.tagline || ""}</span><h4>${d.name}</h4></div></div>
    </a>`
    )
    .join("");
}

function renderThemes(themes) {
  const grid = document.getElementById("themeGrid");
  if (!grid) return;
  if (!themes.length) {
    grid.innerHTML = '<p class="empty-text">No tour themes published yet.</p>';
    return;
  }
  grid.innerHTML = themes
    .map(
      (t) => `
    <div class="theme-card">
      <div class="theme-img"><img src="${t.image}" alt="${t.name}"></div>
      <h4>${t.name}</h4>
    </div>`
    )
    .join("");
}

function renderTestimonials(testimonials) {
  const slider = document.getElementById("testimonialSlider");
  const dotsWrap = document.getElementById("testimonialDots");
  if (!slider || !dotsWrap) return;

  if (!testimonials.length) {
    slider.innerHTML = '<p class="empty-text">No testimonials published yet.</p>';
    dotsWrap.innerHTML = "";
    return;
  }

  slider.innerHTML = testimonials
    .map(
      (t, i) => `
    <div class="testimonial-slide ${i === 0 ? "active" : ""}">
      <div class="quote-mark">"</div>
      <p>${t.quote}</p>
      <div class="testimonial-author">
        <img src="${t.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}`}" alt="${t.name}">
        <div><div class="name">${t.name}</div><div class="place">${t.place || ""}</div></div>
      </div>
    </div>`
    )
    .join("");

  dotsWrap.innerHTML = testimonials
    .map((_, i) => `<button class="${i === 0 ? "active" : ""}" data-slide="${i}" aria-label="Slide ${i + 1}"></button>`)
    .join("");

  initTestimonialSlider();
}

function renderBlog(posts) {
  const grid = document.getElementById("blogGrid");
  if (!grid) return;
  if (!posts.length) {
    grid.innerHTML = '<p class="empty-text">No blog posts published yet.</p>';
    return;
  }
  grid.innerHTML = posts
    .map(
      (p) => `
    <article class="blog-card">
      <div class="blog-media"><img src="${p.image}" alt="${p.title}" loading="lazy"></div>
      <div class="blog-body">
        <span class="blog-date">${new Date(p.publishedOn).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>
        <h4>${p.title}</h4>
        <p>${p.excerpt}</p>
        <a href="blog-post.html?id=${p._id}" class="blog-link">Read More →</a>
      </div>
    </article>`
    )
    .join("");
}
