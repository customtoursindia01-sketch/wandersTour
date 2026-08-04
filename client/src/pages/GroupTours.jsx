import { Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import PageHero from "../components/PageHero.jsx";

export default function GroupTours() {
  return (
    <Layout>
      <PageHero title="Group Tours in India" breadcrumbs={[{ label: "Group Tours" }]} />
      <section className="section">
        <div className="container two-col">
          <div>
            <span className="section-tag">Travel Together</span>
            <h2>Seamless Group Travel, Handled End to End</h2>
            <div className="prose" style={{ marginTop: 16 }}>
              <p>Whether you're traveling with college friends, an extended family, or a community group, Wander India Tours designs group itineraries that balance shared experiences with everyone's individual interests.</p>
              <p>We coordinate multiple vehicles, group-rate hotel bookings, and a lead guide who keeps the whole group moving smoothly from one destination to the next — without the rigid schedule of a typical bus tour.</p>
              <ul>
                <li>Dedicated group coordinator as a single point of contact</li>
                <li>Multiple vehicle convoys for groups of any size</li>
                <li>Group-rate hotel and restaurant bookings</li>
                <li>Flexible itineraries that can split into smaller sub-groups for optional activities</li>
              </ul>
            </div>
            <Link to="/contact" className="btn btn-primary" style={{ marginTop: 10 }}>Request a Group Quote</Link>
          </div>
          <img src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=700&q=80" alt="Group travel in India" />
        </div>
      </section>
      <section className="section section-alt" style={{ textAlign: "center" }}>
        <div className="container">
          <span className="section-tag">Popular With Groups</span>
          <h2>Explore Our Golden Triangle &amp; Rajasthan Itineraries</h2>
          <p style={{ color: "var(--color-muted)", maxWidth: 560, margin: "14px auto 26px" }}>These best-selling routes are easy to scale for groups of 6 to 60 travelers.</p>
          <Link to="/tours" className="btn btn-primary-dark">View Tour Packages</Link>
        </div>
      </section>
    </Layout>
  );
}
