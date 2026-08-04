import { Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import PageHero from "../components/PageHero.jsx";

export default function CorporateTravel() {
  return (
    <Layout>
      <PageHero title="Corporate Travel Services" breadcrumbs={[{ label: "Corporate Travel" }]} />
      <section className="section">
        <div className="container two-col">
          <img src="https://images.unsplash.com/photo-1587474260584-136574528ed5?w=700&q=80" alt="Corporate travel in India" />
          <div>
            <span className="section-tag">Business &amp; MICE Travel</span>
            <h2>Reliable Travel Management for Corporate Groups</h2>
            <div className="prose" style={{ marginTop: 16 }}>
              <p>From single business trips to full corporate offsites, conferences, and incentive travel (MICE), our corporate desk manages logistics so your team can focus on the agenda, not the arrangements.</p>
              <p>We work directly with HR and travel desks to set up recurring bookings, consolidated monthly invoicing, and dedicated account support.</p>
              <ul>
                <li>Airport transfers and inter-city travel for business delegations</li>
                <li>Offsite and incentive trip planning with venue coordination</li>
                <li>Corporate rate agreements and consolidated invoicing</li>
                <li>Dedicated account manager and 24/7 travel desk support</li>
              </ul>
            </div>
            <Link to="/contact" className="btn btn-primary" style={{ marginTop: 10 }}>Request Corporate Quote</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
