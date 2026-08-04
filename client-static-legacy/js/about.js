// ==========================================================================
// Wander India Tours — about.js (about.html)
// ==========================================================================

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const [settings, stats, guides, testimonials] = await Promise.all([
      api("/settings"),
      api("/stats"),
      api("/guides"),
      api("/testimonials"),
    ]);

    applySettingsToDom(settings);
    renderStats(stats);
    renderGuides(guides);
    renderTestimonials(testimonials);
    initCounters();
  } catch (error) {
    console.error("Failed to load About page content:", error);
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

function renderGuides(guides) {
  const grid = document.getElementById("guidesGrid");
  if (!grid) return;
  if (!guides.length) {
    grid.innerHTML = '<p class="empty-text">No guides published yet.</p>';
    return;
  }
  grid.innerHTML = guides
    .map(
      (g) => `
    <div class="guide-card">
      <img src="${g.photo}" alt="Guide ${g.name}">
      <h4>${g.name}</h4>
      <div class="guide-tag">${g.tag}</div>
      <div class="guide-lang">${g.languages}</div>
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
