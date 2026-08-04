import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import StatsStrip from "../components/StatsStrip.jsx";
import TourCard from "../components/TourCard.jsx";
import TestimonialSlider from "../components/TestimonialSlider.jsx";
import { useSettings } from "../context/SettingsContext.jsx";
import api from "../api.js";

export default function Home() {
  const { settings } = useSettings();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      api("/stats"),
      api("/tours"),
      api("/destinations"),
      api("/themes"),
      api("/testimonials"),
      api("/blog"),
    ])
      .then(([stats, tours, destinations, themes, testimonials, blog]) =>
        setData({ stats, tours, destinations, themes, testimonials, blog })
      )
      .catch((err) => setError(err.message));
  }, []);

  const heroStyle = settings?.heroImage
    ? {
        backgroundImage: `linear-gradient(180deg, rgba(10,26,26,0.55), rgba(10,26,26,0.75)), url("${settings.heroImage}")`,
      }
    : undefined;

  return (
    <Layout>
      <section className="hero" id="hero" style={heroStyle}>
        <div className="container">
          <div className="hero-content">
            <span className="hero-badge">⭐ 10+ Years · Government-Certified Guides</span>
            <h1>{settings?.heroHeading || "Discover Incredible India with Trusted Local Experts"}</h1>
            <p>{settings?.heroSubheading || "Private, hand-crafted tours across India — comfortable cars, certified guides, and 24/7 on-ground support from arrival to departure."}</p>
            <div className="hero-actions">
              <Link to="/tours" className="btn btn-primary">Explore Tour Packages</Link>
              <Link to="/contact" className="btn btn-outline">Get Custom Itinerary</Link>
            </div>
          </div>
        </div>
      </section>

      {error ? (
        <div className="container"><p className="loading-text">Could not load content. Is the backend server running?</p></div>
      ) : (
        <>
          <StatsStrip stats={data?.stats} />

          <section className="section">
            <div className="container">
              <div className="section-header center" style={{ marginLeft: "auto", marginRight: "auto" }}>
                <span className="section-tag">Why Travel With Us</span>
                <h2>All-Inclusive, Worry-Free India Travel</h2>
              </div>
              <div className="features-grid">
                {[
                  ["🕑", "24/7 Travel Support", "A dedicated local team assists you from the moment you land to the moment you fly home."],
                  ["🛡️", "Your Safety, Our Priority", "Vetted drivers, verified vehicles and careful route planning for a stress-free journey."],
                  ["🎓", "Certified Local Guides", "Government-approved guides share India's history and culture through authentic experiences."],
                  ["✅", "No Hidden Charges", "Transparent, all-inclusive pricing — what you see in your quote is what you pay."],
                ].map(([icon, title, text]) => (
                  <div className="feature-card" key={title}>
                    <div className="feature-icon">{icon}</div>
                    <h4>{title}</h4>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section section-alt" id="tours">
            <div className="container">
              <div className="section-header center" style={{ marginLeft: "auto", marginRight: "auto" }}>
                <span className="section-tag">Tour Packages</span>
                <h2>Browse Our Best-Selling Itineraries</h2>
                <p>A few favorites our past guests have loved — see the full collection on the Tour Packages page.</p>
              </div>
              <div className="tour-grid">
                {!data ? (
                  <p className="loading-text">Loading tours…</p>
                ) : data.tours.slice(0, 3).map((t) => <TourCard key={t._id} tour={t} />)}
              </div>
              <div style={{ textAlign: "center", marginTop: 36 }}>
                <Link to="/tours" className="btn btn-primary-dark">View All Tour Packages</Link>
              </div>
            </div>
          </section>

          <section className="section" id="destinations">
            <div className="container">
              <div className="section-header center" style={{ marginLeft: "auto", marginRight: "auto" }}>
                <span className="section-tag">Trending Destinations</span>
                <h2>Explore the Regions of India</h2>
                <p>From Mughal monuments to backwater lagoons — pick a region and we'll help you map the perfect route.</p>
              </div>
              <div className="dest-grid">
                {!data ? (
                  <p className="loading-text">Loading destinations…</p>
                ) : (
                  data.destinations.slice(0, 4).map((d) => (
                    <Link className="dest-card" to="/tours" key={d._id}>
                      <img src={d.image} alt={d.name} loading="lazy" />
                      <div className="dest-overlay"><div><span>{d.tagline || ""}</span><h4>{d.name}</h4></div></div>
                    </Link>
                  ))
                )}
              </div>
              <div style={{ textAlign: "center", marginTop: 36 }}>
                <Link to="/destinations" className="btn btn-primary-dark">View All Destinations</Link>
              </div>
            </div>
          </section>

          <section className="section section-alt">
            <div className="container">
              <div className="section-header center" style={{ marginLeft: "auto", marginRight: "auto" }}>
                <span className="section-tag">Tours by Theme</span>
                <h2>Looking for a Particular Kind of Trip?</h2>
                <p>Family holiday, solo adventure or a honeymoon escape — we design each itinerary around how you want to travel.</p>
              </div>
              <div className="theme-grid">
                {!data ? (
                  <p className="loading-text">Loading themes…</p>
                ) : (
                  data.themes.map((t) => (
                    <div className="theme-card" key={t._id}>
                      <div className="theme-img"><img src={t.image} alt={t.name} /></div>
                      <h4>{t.name}</h4>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          <section className="section">
            <div className="container">
              <div className="section-header center" style={{ marginLeft: "auto", marginRight: "auto" }}>
                <span className="section-tag">Testimonials</span>
                <h2>What Our Guests Say</h2>
              </div>
              {!data ? <p className="loading-text">Loading testimonials…</p> : <TestimonialSlider testimonials={data.testimonials} />}
            </div>
          </section>

          <section className="section section-alt" id="blog">
            <div className="container">
              <div className="section-header center" style={{ marginLeft: "auto", marginRight: "auto" }}>
                <span className="section-tag">Travel Inspiration</span>
                <h2>Explore &amp; Get Inspired to Travel India</h2>
                <p>Stories, guides and tips from our travel desk to help you plan the perfect trip.</p>
              </div>
              <div className="blog-grid">
                {!data ? (
                  <p className="loading-text">Loading articles…</p>
                ) : (
                  data.blog.slice(0, 3).map((p) => (
                    <article className="blog-card" key={p._id}>
                      <div className="blog-media"><img src={p.image} alt={p.title} loading="lazy" /></div>
                      <div className="blog-body">
                        <span className="blog-date">{new Date(p.publishedOn).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>
                        <h4>{p.title}</h4>
                        <p>{p.excerpt}</p>
                        <Link to={`/blog/${p._id}`} className="blog-link">Read More →</Link>
                      </div>
                    </article>
                  ))
                )}
              </div>
              <div style={{ textAlign: "center", marginTop: 36 }}>
                <Link to="/blog" className="btn btn-primary-dark">Read More Articles</Link>
              </div>
            </div>
          </section>
        </>
      )}

      <section className="section itinerary-section">
        <div className="container" style={{ textAlign: "center" }}>
          <span className="section-tag">Plan Your Trip</span>
          <h2 style={{ color: "#fff" }}>Ready for Your Tailor-Made India Tour?</h2>
          <p style={{ color: "#cfe9e6", maxWidth: 560, margin: "14px auto 26px" }}>
            Share a few details and our travel experts will design your custom itinerary within 24 hours.
          </p>
          <Link to="/contact" className="btn btn-primary">Get Your Custom Itinerary</Link>
        </div>
      </section>
    </Layout>
  );
}
