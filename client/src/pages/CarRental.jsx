import { Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import PageHero from "../components/PageHero.jsx";

export default function CarRental() {
  return (
    <Layout>
      <PageHero title="Car Rental with Driver in India" breadcrumbs={[{ label: "Car Rental" }]} />
      <section className="section">
        <div className="container two-col">
          <div>
            <span className="section-tag">Comfortable, Vetted Vehicles</span>
            <h2>Book a Car and Driver for a Day Trip or Your Full Journey</h2>
            <div className="prose" style={{ marginTop: 16 }}>
              <p>Need a car and driver for a single day trip, an airport transfer, or your entire multi-city itinerary? Our fleet ranges from compact sedans to spacious SUVs and tempo travellers for larger groups.</p>
              <p>Every vehicle is inspected regularly and every driver is background-verified and trained in guest safety and etiquette.</p>
              <ul>
                <li>Sedans, SUVs and tempo travellers (9–26 seats)</li>
                <li>Experienced, background-verified drivers</li>
                <li>Airport pickup/drop and outstation trips</li>
                <li>Optional Wi-Fi and child seats on request</li>
              </ul>
            </div>
            <Link to="/contact" className="btn btn-primary" style={{ marginTop: 10 }}>Get a Car Quote</Link>
          </div>
          <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=700&q=80" alt="Car rental in India" />
        </div>
      </section>
    </Layout>
  );
}
