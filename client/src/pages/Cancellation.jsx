import Layout from "../components/Layout.jsx";
import PageHero from "../components/PageHero.jsx";

export default function Cancellation() {
  return (
    <Layout>
      <PageHero title="Cancellation Policy" breadcrumbs={[{ label: "Cancellation Policy" }]} />
      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="prose">
            <p><em>Last updated: January 2026. This is placeholder demo content — replace with your own legally-reviewed policy before operating this site commercially.</em></p>
            <h2>Cancellations by the Traveler</h2>
            <ul>
              <li>45+ days before arrival: full refund minus any non-refundable hotel/transport deposits</li>
              <li>15–44 days before arrival: 50% refund of the total tour cost</li>
              <li>0–14 days before arrival: no refund</li>
            </ul>
            <h2>Cancellations by Wander India Tours</h2>
            <p>In the rare case we must cancel a confirmed tour, guests receive a full refund or the option to reschedule at no additional cost.</p>
            <h2>Force Majeure</h2>
            <p>Refund terms may be adjusted in cases of natural disasters, government restrictions, or other events outside our control, in line with the policies of our hotel and transport partners.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
