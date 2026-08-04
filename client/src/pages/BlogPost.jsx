import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import api from "../api.js";

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    api(`/blog/${id}`).then(setPost).catch(() => setError(true));
  }, [id]);

  if (error) {
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <p className="empty-text">This article could not be found. <Link to="/blog">Browse the blog</Link>.</p>
          </div>
        </section>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <section className="section"><div className="container"><p className="loading-text">Loading article…</p></div></section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section">
        <div className="container">
          <div className="blog-post-content">
            <div className="breadcrumb" style={{ justifyContent: "flex-start", color: "var(--color-muted)", marginBottom: 20 }}>
              <Link to="/" style={{ color: "var(--color-muted)" }}>Home</Link><span className="sep">/</span>
              <Link to="/blog" style={{ color: "var(--color-muted)" }}>Blog</Link><span className="sep">/</span>
              <span>{post.title}</span>
            </div>
            <div className="blog-post-header">
              <span className="blog-date">{new Date(post.publishedOn).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}</span>
              <h1>{post.title}</h1>
              <img src={post.image} alt={post.title} />
            </div>
            <div className="prose">
              <p><strong>{post.excerpt}</strong></p>
              <p>{post.excerpt} Wander India Tours' travel desk put together this guide to help you plan a smoother, more memorable trip — from the best time to go, to the small details that make a big difference on the ground.</p>
              <h2>Planning Your Trip</h2>
              <p>Every journey in India rewards a little planning. Our certified local guides and drivers know the right time of day to visit each site, the routes that avoid the crowds, and the small experiences that don't make it into most guidebooks.</p>
              <h2>Ready to Experience It Yourself?</h2>
              <p>If this has you dreaming of your own India itinerary, our travel experts can build a private, custom route around exactly what you want to see.</p>
            </div>
            <div style={{ marginTop: 30 }}>
              <Link to="/contact" className="btn btn-primary">Plan Your Custom Itinerary</Link>
              <Link to="/blog" className="btn btn-outline-dark" style={{ marginLeft: 12 }}>← Back to Blog</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
