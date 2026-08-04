import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import PageHero from "../components/PageHero.jsx";
import StatsStrip from "../components/StatsStrip.jsx";
import TestimonialSlider from "../components/TestimonialSlider.jsx";
import { useSettings } from "../context/SettingsContext.jsx";
import api from "../api.js";

export default function About() {
  const { settings } = useSettings();
  const [stats, setStats] = useState(null);
  const [guides, setGuides] = useState(null);
  const [testimonials, setTestimonials] = useState(null);

  useEffect(() => {
    Promise.all([api("/stats"), api("/guides"), api("/testimonials")])
      .then(([s, g, t]) => {
        setStats(s);
        setGuides(g);
        setTestimonials(t);
      })
      .catch(console.error);
  }, []);

  return (
    <Layout>
      <PageHero title="About Us" breadcrumbs={[{ label: "About Us" }]} />

      <section className="section" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-media">
              <img
                src={settings?.aboutImage || "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=650&q=80"}
                alt="Wander India Tours guests"
                loading="lazy"
              />
              <div className="about-badge"><strong>10+</strong><span>Years of Experience</span></div>
            </div>
            <div>
              <span className="section-tag">Our Story</span>
              <h2>{settings?.aboutHeading || "A Locally-Owned Tour Company Built on Trust"}</h2>
              <p style={{ color: "var(--color-muted)", marginTop: 14 }}>{settings?.aboutBody || "Loading…"}</p>
              <div className="why-list">
                {(settings?.whyChooseUs || []).map((item) => (
                  <div className="why-item" key={item}>
                    <span className="why-check">✓</span><span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="about-actions">
                <Link to="/tours" className="btn btn-primary">View Tour Packages</Link>
                <Link to="/contact" className="btn btn-primary-dark">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsStrip stats={stats} />

      <section className="section" id="guides" style={{ paddingTop: 110 }}>
        <div className="container">
          <div className="section-header center" style={{ marginLeft: "auto", marginRight: "auto" }}>
            <span className="section-tag">Expert Guides</span>
            <h2>Meet a Few of Our Certified Local Guides</h2>
          </div>
          <div className="guides-grid">
            {!guides ? (
              <p className="loading-text">Loading guides…</p>
            ) : !guides.length ? (
              <p className="empty-text">No guides published yet.</p>
            ) : (
              guides.map((g) => (
                <div className="guide-card" key={g._id}>
                  <img src={g.photo} alt={`Guide ${g.name}`} />
                  <h4>{g.name}</h4>
                  <div className="guide-tag">{g.tag}</div>
                  <div className="guide-lang">{g.languages}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header center" style={{ marginLeft: "auto", marginRight: "auto" }}>
            <span className="section-tag">Testimonials</span>
            <h2>What Our Guests Say</h2>
          </div>
          {!testimonials ? <p className="loading-text">Loading testimonials…</p> : <TestimonialSlider testimonials={testimonials} />}
        </div>
      </section>
    </Layout>
  );
}
