import Layout from "../components/Layout.jsx";
import PageHero from "../components/PageHero.jsx";

export default function Terms() {
  return (
    <Layout>
      <PageHero title="Terms &amp; Conditions" breadcrumbs={[{ label: "Terms & Conditions" }]} />
      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="prose">
            <p><em>Last updated: January 2026. This is placeholder demo content — replace with your own legally-reviewed terms before operating this site commercially.</em></p>
            <h2>1. Booking &amp; Payments</h2>
            <p>A booking is confirmed once the requested deposit is received. Full payment terms and due dates are communicated at the time of quotation and vary by itinerary and season.</p>
            <h2>2. Itinerary Changes</h2>
            <p>Wander India Tours reserves the right to modify itineraries due to weather, safety, local restrictions, or circumstances beyond our control, while maintaining an equivalent travel experience wherever possible.</p>
            <h2>3. Traveler Responsibilities</h2>
            <p>Travelers are responsible for ensuring valid passports, visas, travel insurance, and any required vaccinations prior to departure.</p>
            <h2>4. Liability</h2>
            <p>Wander India Tours acts as an agent for third-party service providers (hotels, drivers, guides) and is not liable for circumstances outside its reasonable control.</p>
            <h2>5. Governing Law</h2>
            <p>These terms are governed by the laws of India, with disputes subject to the jurisdiction of the courts of Jaipur, Rajasthan.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
