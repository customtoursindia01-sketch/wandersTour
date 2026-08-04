import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import PageHero from "../components/PageHero.jsx";
import api from "../api.js";

export default function Faqs() {
  const [faqs, setFaqs] = useState(null);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    api("/faqs").then(setFaqs).catch(console.error);
  }, []);

  return (
    <Layout>
      <PageHero title="India Travel FAQs" breadcrumbs={[{ label: "Travel FAQs" }]} />

      <section className="section">
        <div className="container">
          <div className="faq-layout">
            <div>
              <span className="section-tag">Have Questions?</span>
              <h2>Frequently Asked Questions</h2>
              <p style={{ color: "var(--color-muted)", marginTop: 14 }}>
                Can't find the answer you're looking for? Reach out to our travel team directly and we'll respond within 24 hours.
              </p>
              <Link to="/contact" className="btn btn-primary-dark" style={{ marginTop: 20 }}>Contact Our Team</Link>
            </div>
            <div>
              {!faqs ? (
                <p className="loading-text">Loading FAQs…</p>
              ) : !faqs.length ? (
                <p className="empty-text">No FAQs published yet.</p>
              ) : (
                faqs.map((f, i) => (
                  <div className={`faq-item ${i === openIndex ? "open" : ""}`} key={f._id || i}>
                    <button className="faq-question" onClick={() => setOpenIndex(i === openIndex ? -1 : i)}>
                      {f.question} <span className="icon">+</span>
                    </button>
                    <div className="faq-answer"><p>{f.answer}</p></div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
