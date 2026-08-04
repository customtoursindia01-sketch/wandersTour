// ==========================================================================
// Wander India Tours — contact.js (contact.html)
// ==========================================================================

document.addEventListener("DOMContentLoaded", async () => {
  initItineraryForm("itineraryForm");
  try {
    const settings = await api("/settings");
    applySettingsToDom(settings);
  } catch (error) {
    console.error("Failed to load settings:", error);
  }
});
