import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import PageHero from "../components/PageHero.jsx";
import api from "../api.js";

export default function Destinations() {
  const [destinations, setDestinations] = useState(null);

  useEffect(() => {
    api("/destinations").then(setDestinations).catch(console.error);
  }, []);

  return (
    <Layout>
      <PageHero title="Destinations in India" breadcrumbs={[{ label: "Destinations" }]} />

      <section className="section">
        <div className="container">
          <div className="section-header center" style={{ marginLeft: "auto", marginRight: "auto", maxWidth: 780 }}>
            <span className="section-tag">Explore Trending Destinations</span>
            <h2>Where Will Your India Journey Begin?</h2>
            <p>We'll take you through the winding lanes of Delhi's old markets, find tranquility at the Taj Mahal in Agra, look for temple carvings in Khajuraho, follow hiking trails in the Himalayan hill stations, map Rajasthan's desert from a hot air balloon, relax on the beaches of Goa, and walk the ghats of the holy city of Varanasi. Wherever your curiosity leads, Wander India Tours is your guide to discovering India.</p>
          </div>
          <div className="dest-grid">
            {!destinations ? (
              <p className="loading-text">Loading destinations…</p>
            ) : !destinations.length ? (
              <p className="empty-text">No destinations published yet.</p>
            ) : (
              destinations.map((d) => (
                <Link className="dest-card" to="/tours" key={d._id}>
                  <img src={d.image} alt={d.name} loading="lazy" />
                  <div className="dest-overlay"><div><span>{d.tagline || ""}</span><h4>{d.name}</h4></div></div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container" style={{ textAlign: "center" }}>
          <span className="section-tag">Custom Routes</span>
          <h2>Don't See Your Dream Destination?</h2>
          <p style={{ color: "var(--color-muted)", maxWidth: 560, margin: "14px auto 26px" }}>
            Every itinerary on this site can be extended, combined, or rebuilt from scratch. Tell us where you want to go.
          </p>
          <Link to="/contact" className="btn btn-primary-dark">Talk to a Travel Expert</Link>
        </div>
      </section>
    </Layout>
  );
}
