// ==========================================================================
// Wander India Tours — common.js
// Shared utilities + header/footer population, used by every page.
// ==========================================================================

const API = window.API_BASE_URL;

async function api(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Request failed: ${res.status}`);
  }
  return res.json();
}

/** Wraps the last word of a brand name in a <span> for the accent color. */
function brandHtml(name) {
  const words = (name || "").trim().split(" ");
  if (words.length < 2) return name || "";
  const last = words.pop();
  return `${words.join(" ")} <span>${last}</span>`;
}

function formatPrice(price, currency = "USD") {
  const symbols = { USD: "$", EUR: "€", GBP: "£", INR: "₹" };
  const symbol = symbols[currency] || "";
  return `${symbol}${Number(price).toLocaleString()}`;
}

function slugify(text) {
  return (text || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function qs(name) {
  return new URLSearchParams(window.location.search).get(name);
}

/** Patches every element carrying the shared `.js-*` classes with live settings data. */
function applySettingsToDom(settings) {
  document.querySelectorAll(".js-logo").forEach((el) => (el.innerHTML = brandHtml(settings.siteName)));
  document.querySelectorAll(".js-phone-link").forEach((el) => {
    el.textContent = `📞 ${settings.phone}`;
    el.href = `tel:${settings.phone.replace(/\s+/g, "")}`;
  });
  document.querySelectorAll(".js-email-link").forEach((el) => {
    el.textContent = `✉ ${settings.email}`;
    el.href = `mailto:${settings.email}`;
  });
  document.querySelectorAll(".js-address").forEach((el) => (el.textContent = settings.address));
  document.querySelectorAll(".js-nav-phone").forEach((el) => (el.textContent = `Talk to an expert: ${settings.phone}`));
  document.querySelectorAll(".js-footer-phone").forEach((el) => (el.textContent = `📞 ${settings.phone}`));
  document.querySelectorAll(".js-footer-email").forEach((el) => (el.textContent = `✉ ${settings.email}`));
  document.querySelectorAll(".js-footer-address").forEach((el) => (el.textContent = `📍 ${settings.address}`));
  document.querySelectorAll(".js-tagline").forEach(
    (el) =>
      (el.textContent = `${settings.siteName} designs private India itineraries with trusted drivers, certified local guides, and flexible planning — from same-day city tours to multi-week journeys.`)
  );
  document.querySelectorAll(".js-contact-phone").forEach((el) => (el.textContent = settings.phone));
  document.querySelectorAll(".js-contact-email").forEach((el) => (el.textContent = settings.email));
  document.querySelectorAll(".js-contact-address").forEach((el) => (el.textContent = settings.address));

  document.querySelectorAll(".js-facebook").forEach((el) => (el.href = settings.facebookUrl || "#"));
  document.querySelectorAll(".js-instagram").forEach((el) => (el.href = settings.instagramUrl || "#"));
  document.querySelectorAll(".js-tripadvisor").forEach((el) => (el.href = settings.tripadvisorUrl || "#"));

  const whatsappFloat = document.getElementById("whatsappFloat");
  if (whatsappFloat) whatsappFloat.href = `https://wa.me/${settings.whatsapp}`;

  const hero = document.getElementById("hero");
  if (hero) {
    hero.style.backgroundImage = `linear-gradient(180deg, rgba(10,26,26,0.55), rgba(10,26,26,0.75)), url("${settings.heroImage}")`;
  }
  const heroHeading = document.getElementById("heroHeading");
  if (heroHeading) heroHeading.textContent = settings.heroHeading;
  const heroSubheading = document.getElementById("heroSubheading");
  if (heroSubheading) heroSubheading.textContent = settings.heroSubheading;

  const aboutHeading = document.getElementById("aboutHeading");
  if (aboutHeading) aboutHeading.textContent = settings.aboutHeading;
  const aboutBody = document.getElementById("aboutBody");
  if (aboutBody) aboutBody.textContent = settings.aboutBody;
  const aboutImage = document.getElementById("aboutImage");
  if (aboutImage) aboutImage.src = settings.aboutImage;

  const whyList = document.getElementById("whyList");
  if (whyList && Array.isArray(settings.whyChooseUs)) {
    whyList.innerHTML = settings.whyChooseUs
      .map((item) => `<div class="why-item"><span class="why-check">✓</span><span>${item}</span></div>`)
      .join("");
  }

  document.title = document.title.replace("Wander India Tours", settings.siteName);
}

async function loadCommonSettings() {
  const settings = await api("/settings");
  applySettingsToDom(settings);
  return settings;
}

/* ---------------- Mobile Nav ---------------- */
function initMobileNav() {
  const toggle = document.getElementById("navToggle");
  const body = document.body;
  if (!toggle) return;

  toggle.addEventListener("click", () => body.classList.toggle("nav-open"));

  document.querySelectorAll(".has-dropdown > a").forEach((link) => {
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 960) {
        e.preventDefault();
        link.parentElement.classList.toggle("open");
      }
    });
  });

  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 960) body.classList.remove("nav-open");
    });
  });
}

/* ---------------- Tab switching (used on the tours listing page) ---------------- */
function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab)?.classList.add("active");
    });
  });
}

/* ---------------- FAQ Accordion ---------------- */
function initFaqAccordion() {
  const items = document.querySelectorAll(".faq-item");
  items.forEach((item) => {
    item.querySelector(".faq-question").addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      items.forEach((i) => i.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    });
  });
}

/* ---------------- Testimonial Slider ---------------- */
function initTestimonialSlider() {
  const slides = document.querySelectorAll(".testimonial-slide");
  const dots = document.querySelectorAll(".testimonial-dots button");
  if (!slides.length) return;

  let current = 0;
  let timer;

  function showSlide(index) {
    slides.forEach((s) => s.classList.remove("active"));
    dots.forEach((d) => d.classList.remove("active"));
    slides[index].classList.add("active");
    if (dots[index]) dots[index].classList.add("active");
    current = index;
  }
  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }
  function resetAutoPlay() {
    clearInterval(timer);
    timer = setInterval(nextSlide, 6000);
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showSlide(Number(dot.dataset.slide));
      resetAutoPlay();
    });
  });

  resetAutoPlay();
}

/* ---------------- Animated Stat Counters ---------------- */
function initCounters() {
  const counters = document.querySelectorAll(".stat-number");
  if (!counters.length) return;

  const animate = (el) => {
    const target = Number(el.dataset.count) || 0;
    const duration = 1400;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      el.textContent = Math.floor(progress * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString() + "+";
    }
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((el) => observer.observe(el));
}

/* ---------------- Itinerary / contact Form (posts to backend) ---------------- */
function initItineraryForm(formId = "itineraryForm") {
  const form = document.getElementById(formId);
  const success = document.getElementById("formSuccess");
  const errorBox = document.getElementById("formError");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorBox.classList.remove("show");
    success.classList.remove("show");

    const payload = {
      arrivalDate: form.arrival?.value || "",
      departureDate: form.departure?.value || "",
      travelers: Number(form.travelers?.value) || 1,
      destination: form.destination?.value || "",
      accommodation: form.accommodation?.value || "",
      budget: form.budget?.value || "",
      fullName: form.fullname.value,
      email: form.email.value,
      country: form.country?.value || "",
      whatsapp: form.whatsapp?.value || "",
      source: form.source?.value || "",
      notes: form.notes?.value || "",
    };

    try {
      await api("/inquiries", { method: "POST", body: JSON.stringify(payload) });
      success.classList.add("show");
      form.reset();
      success.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (error) {
      errorBox.textContent = `⚠ ${error.message}`;
      errorBox.classList.add("show");
    }
  });
}

document.addEventListener("DOMContentLoaded", initMobileNav);
