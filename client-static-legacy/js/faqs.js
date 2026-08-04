// ==========================================================================
// Wander India Tours — faqs.js (faqs.html)
// ==========================================================================

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const [settings, faqs] = await Promise.all([api("/settings"), api("/faqs")]);
    applySettingsToDom(settings);
    renderFaqs(faqs);
  } catch (error) {
    console.error("Failed to load FAQs:", error);
    document.getElementById("faqList").innerHTML =
      '<p class="loading-text">Could not load FAQs. Is the backend server running?</p>';
  }
});

function renderFaqs(faqs) {
  const wrap = document.getElementById("faqList");
  if (!faqs.length) {
    wrap.innerHTML = '<p class="empty-text">No FAQs published yet.</p>';
    return;
  }
  wrap.innerHTML = faqs
    .map(
      (f, i) => `
    <div class="faq-item ${i === 0 ? "open" : ""}">
      <button class="faq-question">${f.question} <span class="icon">+</span></button>
      <div class="faq-answer"><p>${f.answer}</p></div>
    </div>`
    )
    .join("");
  initFaqAccordion();
}
