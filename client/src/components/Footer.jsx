import { Link } from "react-router-dom";
import { useSettings } from "../context/SettingsContext.jsx";
import BrandName from "./BrandName.jsx";

export default function Footer() {
  const { settings } = useSettings();
  const siteName = settings?.siteName || "Wander India Tours";
  const tagline = settings
    ? `${settings.siteName} designs private India itineraries with trusted drivers, certified local guides, and flexible planning — from same-day city tours to multi-week journeys.`
    : "Loading…";

  return (
    <>
      <footer className="site-footer" id="contact">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-about">
              <Link to="/" className="footer-logo">
                <BrandName name={siteName} />
              </Link>
              <p>{tagline}</p>
              <div className="footer-social">
                <a href={settings?.facebookUrl || "#"} aria-label="Facebook">FB</a>
                <a href={settings?.instagramUrl || "#"} aria-label="Instagram">IG</a>
                <a href={settings?.tripadvisorUrl || "#"} aria-label="Tripadvisor">TA</a>
              </div>
            </div>
            <div className="footer-col">
              <h5>Quick Links</h5>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/destinations">Destinations</Link></li>
                <li><Link to="/group-tours">Group Tours</Link></li>
                <li><Link to="/corporate-travel">Corporate Travel</Link></li>
                <li><Link to="/car-rental">Car Rental</Link></li>
                <li><Link to="/blog">Travel Blog</Link></li>
                <li><Link to="/faqs">Travel FAQs</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>Tour Packages</h5>
              <ul>
                <li><Link to="/tours?category=Golden+Triangle+Tours">Golden Triangle Tours</Link></li>
                <li><Link to="/tours?category=Rajasthan+Tours">Rajasthan Tours</Link></li>
                <li><Link to="/tours?category=Same+Day+Tours">Same Day Tours</Link></li>
                <li><Link to="/tours?category=South+India+Tours">South India Tours</Link></li>
                <li><Link to="/tours">All Tour Packages</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>Contact Us</h5>
              <ul className="footer-contact">
                <li>📞 {settings?.phone || "Loading…"}</li>
                <li>✉ {settings?.email || "Loading…"}</li>
                <li>📍 {settings?.address || "Loading…"}</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>Copyright © 2026 {siteName}. All Rights Reserved. (Demo project — dummy data)</span>
            <span>
              <Link to="/terms">Terms &amp; Conditions</Link> ·{" "}
              <Link to="/privacy">Privacy Policy</Link> ·{" "}
              <Link to="/cancellation">Cancellation Policy</Link>
            </span>
          </div>
        </div>
      </footer>
      <a
        className="whatsapp-float"
        href={`https://wa.me/${settings?.whatsapp || "919876543210"}`}
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
      >
        💬
      </a>
    </>
  );
}
