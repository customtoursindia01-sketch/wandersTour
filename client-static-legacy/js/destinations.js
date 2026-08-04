// ==========================================================================
// Wander India Tours — destinations.js (destinations.html)
// ==========================================================================

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const [settings, destinations] = await Promise.all([api("/settings"), api("/destinations")]);
    applySettingsToDom(settings);
    renderDestinations(destinations);
  } catch (error) {
    console.error("Failed to load destinations:", error);
    document.getElementById("destGrid").innerHTML =
      '<p class="loading-text">Could not load destinations. Is the backend server running?</p>';
  }
});

function renderDestinations(destinations) {
  const grid = document.getElementById("destGrid");
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
