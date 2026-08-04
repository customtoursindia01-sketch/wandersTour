import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import PageHero from "../components/PageHero.jsx";
import TourCard from "../components/TourCard.jsx";
import { useSettings } from "../context/SettingsContext.jsx";
import { formatPrice } from "../utils.js";
import api from "../api.js";

export default function TourDetail() {
  const { id } = useParams();
  const { settings } = useSettings();
  const [tour, setTour] = useState(null);
  const [related, setRelated] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    Promise.all([api(`/tours/${id}`), api("/tours")])
      .then(([t, allTours]) => {
        setTour(t);
        setRelated(allTours.filter((x) => x.category === t.category && x._id !== t._id).slice(0, 3));
      })
      .catch(() => setError(true));
  }, [id]);

  if (error) {
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <p className="empty-text">This tour could not be found. <Link to="/tours">Browse all tours</Link>.</p>
          </div>
        </section>
      </Layout>
    );
  }

  if (!tour) {
    return (
      <Layout>
        <PageHero title="Loading…" breadcrumbs={[{ to: "/tours", label: "Tour Packages" }, { label: "Tour" }]} />
        <section className="section"><div className="container"><p className="loading-text">Loading tour details…</p></div></section>
      </Layout>
    );
  }

  const whatsappHref = settings?.whatsapp
    ? `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(`Hi! I'd like more information about the "${tour.title}" tour.`)}`
    : "#";

  return (
    <Layout>
      <PageHero
        title={tour.title}
        breadcrumbs={[{ to: "/tours", label: "Tour Packages" }, { label: tour.title }]}
      />

      <section className="section">
        <div className="container">
          <div className="tour-detail-layout">
            <div>
              <div className="tour-detail-gallery">
                <img src={tour.image} alt={tour.title} />
              </div>
              <div className="tour-detail-meta">
                <div className="meta-item"><strong>{tour.duration}</strong>Duration</div>
                <div className="meta-item"><strong>{tour.route}</strong>Route</div>
                <div className="meta-item"><strong>{tour.category}</strong>Category</div>
              </div>
              <div className="prose">
                <h2>Overview</h2>
                <p>{tour.description || `Explore ${tour.route} on this private, guided itinerary. Every Wander India Tours package includes a dedicated driver, hand-picked accommodation as per your preference, and a certified local guide who brings each stop to life.`}</p>
                <h3>What's Included</h3>
                <ul>
                  <li>Private air-conditioned vehicle with an experienced driver</li>
                  <li>Certified English-speaking local guide at each major sight</li>
                  <li>All monument entry fees as per the itinerary</li>
                  <li>24/7 on-ground support for the duration of your trip</li>
                </ul>
                <h3>Not Included</h3>
                <ul>
                  <li>International and domestic flights</li>
                  <li>Personal expenses and travel insurance</li>
                  <li>Meals not specified in the itinerary</li>
                </ul>
              </div>
            </div>

            <div className="booking-box">
              <div className="price-tag">{formatPrice(tour.price, tour.currency)} <span>per person</span></div>
              <p>Prices are indicative and vary with group size, season and accommodation category. Get a firm quote in under 24 hours.</p>
              <Link to="/contact" className="btn btn-primary btn-block" style={{ justifyContent: "center", marginTop: 10 }}>Enquire About This Tour</Link>
              <a className="btn btn-outline-dark btn-block" style={{ justifyContent: "center", marginTop: 10 }} href={whatsappHref} target="_blank" rel="noopener">Chat on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-header center" style={{ marginLeft: "auto", marginRight: "auto" }}>
              <span className="section-tag">Similar Tours</span>
              <h2>You Might Also Like</h2>
            </div>
            <div className="tour-grid">
              {related.map((t) => <TourCard key={t._id} tour={t} />)}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
