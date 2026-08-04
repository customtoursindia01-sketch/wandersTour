import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import PageHero from "../components/PageHero.jsx";
import TourCard from "../components/TourCard.jsx";
import { slugify } from "../utils.js";
import api from "../api.js";

export default function Tours() {
  const [searchParams] = useSearchParams();
  const preselect = searchParams.get("category");
  const [tours, setTours] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    api("/tours")
      .then((data) => {
        setTours(data);
        if (preselect) {
          const categories = [...new Set(data.map((t) => t.category))];
          const idx = categories.indexOf(preselect);
          if (idx >= 0) setActiveTab(idx);
        }
      })
      .catch(console.error);
  }, [preselect]);

  const categories = tours ? [...new Set(tours.map((t) => t.category))] : [];

  return (
    <Layout>
      <PageHero title="Tour Packages" breadcrumbs={[{ label: "Tour Packages" }]} />

      <section className="section">
        <div className="container">
          <div className="section-header center" style={{ marginLeft: "auto", marginRight: "auto" }}>
            <span className="section-tag">All Itineraries</span>
            <h2>Experience the Diversity of India</h2>
            <p>Hand-picked itineraries across India's most loved circuits — every trip is private and can be tailored to your pace.</p>
          </div>

          {!tours ? (
            <p className="loading-text">Loading tours…</p>
          ) : !tours.length ? (
            <p className="empty-text">No tour packages published yet.</p>
          ) : (
            <>
              <div className="tabs-nav">
                {categories.map((cat, i) => (
                  <button
                    key={cat}
                    className={`tab-btn ${i === activeTab ? "active" : ""}`}
                    onClick={() => setActiveTab(i)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              {categories.map((cat, i) => (
                <div key={cat} className={`tab-panel ${i === activeTab ? "active" : ""}`} id={`tab-${slugify(cat)}`}>
                  <div className="tour-grid">
                    {tours.filter((t) => t.category === cat).map((t) => (
                      <TourCard key={t._id} tour={t} />
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container" style={{ textAlign: "center" }}>
          <span className="section-tag">Not Sure Where to Start?</span>
          <h2>Let Us Build a Custom Itinerary for You</h2>
          <p style={{ color: "var(--color-muted)", maxWidth: 560, margin: "14px auto 26px" }}>
            Tell us your travel dates, budget, and interests — our team will design a tailor-made route within 24 hours.
          </p>
          <Link to="/contact" className="btn btn-primary-dark">Get Your Custom Itinerary</Link>
        </div>
      </section>
    </Layout>
  );
}
