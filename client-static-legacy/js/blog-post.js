// ==========================================================================
// Wander India Tours — blog-post.js (blog-post.html?id=...)
// ==========================================================================

document.addEventListener("DOMContentLoaded", async () => {
  const id = qs("id");
  const section = document.getElementById("blogPostSection");

  if (!id) {
    section.innerHTML = '<div class="container"><p class="empty-text">No article specified. <a href="blog.html">Browse the blog</a>.</p></div>';
    return;
  }

  try {
    const [settings, post] = await Promise.all([api("/settings"), api(`/blog/${id}`)]);
    applySettingsToDom(settings);
    renderPost(post);
  } catch (error) {
    console.error("Failed to load blog post:", error);
    section.innerHTML = '<div class="container"><p class="empty-text">This article could not be found. <a href="blog.html">Browse the blog</a>.</p></div>';
  }
});

function renderPost(post) {
  document.title = `${post.title} | Wander India Tours`;
  const section = document.getElementById("blogPostSection");

  section.innerHTML = `
    <div class="container">
      <div class="blog-post-content">
        <div class="breadcrumb" style="justify-content:flex-start;color:var(--color-muted);margin-bottom:20px;">
          <a href="index.html" style="color:var(--color-muted);">Home</a><span class="sep">/</span>
          <a href="blog.html" style="color:var(--color-muted);">Blog</a><span class="sep">/</span>
          <span>${post.title}</span>
        </div>
        <div class="blog-post-header">
          <span class="blog-date">${new Date(post.publishedOn).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}</span>
          <h1>${post.title}</h1>
          <img src="${post.image}" alt="${post.title}">
        </div>
        <div class="prose">
          <p><strong>${post.excerpt}</strong></p>
          <p>${post.excerpt} Wander India Tours' travel desk put together this guide to help you plan a smoother, more memorable trip — from the best time to go, to the small details that make a big difference on the ground.</p>
          <h2>Planning Your Trip</h2>
          <p>Every journey in India rewards a little planning. Our certified local guides and drivers know the right time of day to visit each site, the routes that avoid the crowds, and the small experiences that don't make it into most guidebooks.</p>
          <h2>Ready to Experience It Yourself?</h2>
          <p>If this has you dreaming of your own India itinerary, our travel experts can build a private, custom route around exactly what you want to see.</p>
        </div>
        <div style="margin-top:30px;">
          <a href="contact.html" class="btn btn-primary">Plan Your Custom Itinerary</a>
          <a href="blog.html" class="btn btn-outline-dark" style="margin-left:12px;">← Back to Blog</a>
        </div>
      </div>
    </div>
  `;
}
