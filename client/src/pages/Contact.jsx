import Layout from "../components/Layout.jsx";
import PageHero from "../components/PageHero.jsx";
import ItineraryForm from "../components/ItineraryForm.jsx";
import { useSettings } from "../context/SettingsContext.jsx";

export default function Contact() {
  const { settings } = useSettings();

  return (
    <Layout>
      <PageHero title="Plan Your Tailor-Made India Tour" breadcrumbs={[{ label: "Contact Us" }]} />

      <section className="section">
        <div className="container contact-grid">
          <div>
            <span className="section-tag">Get In Touch</span>
            <h2>We'd Love to Help You Plan</h2>
            <p style={{ color: "var(--color-muted)", marginTop: 14 }}>
              Share a few details about your trip and our travel experts will design a custom itinerary within 24 hours — no obligation, no hidden fees.
            </p>
            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="icon">📞</div>
                <div><strong>Call or WhatsApp</strong><span>{settings?.phone || "Loading…"}</span></div>
              </div>
              <div className="contact-info-item">
                <div className="icon">✉</div>
                <div><strong>Email</strong><span>{settings?.email || "Loading…"}</span></div>
              </div>
              <div className="contact-info-item">
                <div className="icon">📍</div>
                <div><strong>Office</strong><span>{settings?.address || "Loading…"}</span></div>
              </div>
            </div>
          </div>
          <ItineraryForm />
        </div>
      </section>
    </Layout>
  );
}
