// ==========================================================================
// Wander India Tours — blog.js (blog.html — full listing)
// ==========================================================================

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const [settings, posts] = await Promise.all([api("/settings"), api("/blog")]);
    applySettingsToDom(settings);
    renderBlog(posts);
  } catch (error) {
    console.error("Failed to load blog posts:", error);
    document.getElementById("blogGrid").innerHTML =
      '<p class="loading-text">Could not load articles. Is the backend server running?</p>';
  }
});

function renderBlog(posts) {
  const grid = document.getElementById("blogGrid");
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
        <span class="blog-date">${new Date(p.publishedOn).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
        <h4>${p.title}</h4>
        <p>${p.excerpt}</p>
        <a href="blog-post.html?id=${p._id}" class="blog-link">Read More →</a>
      </div>
    </article>`
    )
    .join("");
}
