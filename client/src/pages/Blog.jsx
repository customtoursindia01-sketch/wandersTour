import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import PageHero from "../components/PageHero.jsx";
import api from "../api.js";

export default function Blog() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    api("/blog").then(setPosts).catch(console.error);
  }, []);

  return (
    <Layout>
      <PageHero title="Explore & Get Inspired to Travel India" breadcrumbs={[{ label: "Blog" }]} />

      <section className="section">
        <div className="container">
          <div className="blog-grid">
            {!posts ? (
              <p className="loading-text">Loading articles…</p>
            ) : !posts.length ? (
              <p className="empty-text">No blog posts published yet.</p>
            ) : (
              posts.map((p) => (
                <article className="blog-card" key={p._id}>
                  <div className="blog-media"><img src={p.image} alt={p.title} loading="lazy" /></div>
                  <div className="blog-body">
                    <span className="blog-date">{new Date(p.publishedOn).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
                    <h4>{p.title}</h4>
                    <p>{p.excerpt}</p>
                    <Link to={`/blog/${p._id}`} className="blog-link">Read More →</Link>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
