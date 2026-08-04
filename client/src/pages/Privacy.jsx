import Layout from "../components/Layout.jsx";
import PageHero from "../components/PageHero.jsx";

export default function Privacy() {
  return (
    <Layout>
      <PageHero title="Privacy Policy" breadcrumbs={[{ label: "Privacy Policy" }]} />
      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="prose">
            <p><em>Last updated: January 2026. This is placeholder demo content — replace with your own legally-reviewed policy before operating this site commercially.</em></p>
            <h2>1. Information We Collect</h2>
            <p>When you submit a custom itinerary request, we collect your name, email, phone/WhatsApp number, and trip preferences to prepare your quote.</p>
            <h2>2. How We Use Your Information</h2>
            <p>Your details are used solely to plan and communicate about your trip, and are never sold to third parties.</p>
            <h2>3. Data Storage</h2>
            <p>Inquiry data is stored securely in our booking system and retained only as long as necessary to service your request.</p>
            <h2>4. Your Rights</h2>
            <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us.</p>
            <h2>5. Cookies</h2>
            <p>This site may use basic cookies to remember your preferences and improve your browsing experience.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
