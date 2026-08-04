import { useState } from "react";
import api from "../api.js";

export default function ItineraryForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError("");

    const form = e.target;
    const payload = {
      arrivalDate: form.arrival?.value || "",
      departureDate: form.departure?.value || "",
      travelers: Number(form.travelers?.value) || 1,
      destination: form.destination?.value || "",
      accommodation: form.accommodation?.value || "",
      budget: form.budget?.value || "",
      fullName: form.fullname.value,
      email: form.email.value,
      country: form.country?.value || "",
      whatsapp: form.whatsapp?.value || "",
      source: form.source?.value || "",
      notes: form.notes?.value || "",
    };

    try {
      await api("/inquiries", { method: "POST", body: JSON.stringify(payload) });
      setSuccess(true);
      form.reset();
    } catch (err) {
      setError(`⚠ ${err.message}`);
    }
  };

  return (
    <form className="itinerary-form" id="itineraryForm" onSubmit={handleSubmit}>
      <div className="form-legend">Travel Details</div>
      <div className="form-grid">
        <div className="field"><label htmlFor="arrival">Arrival Date</label><input type="date" id="arrival" name="arrival" /></div>
        <div className="field"><label htmlFor="departure">Departure Date</label><input type="date" id="departure" name="departure" /></div>
        <div className="field"><label htmlFor="travelers">Number of Travelers</label><input type="number" id="travelers" name="travelers" min="1" placeholder="e.g. 2" /></div>
        <div className="field"><label htmlFor="destination">Preferred Destinations</label>
          <select id="destination" name="destination" defaultValue="Golden Triangle">
            <option>Golden Triangle</option>
            <option>Rajasthan</option>
            <option>South India</option>
            <option>North East India</option>
            <option>Not sure yet</option>
          </select>
        </div>
        <div className="field"><label htmlFor="accommodation">Accommodation Preference</label>
          <select id="accommodation" name="accommodation" defaultValue="Standard">
            <option>Budget</option>
            <option>Standard</option>
            <option>Luxury</option>
          </select>
        </div>
        <div className="field"><label htmlFor="budget">Estimated Budget (USD)</label><input type="text" id="budget" name="budget" placeholder="e.g. $1000 - $1500" /></div>
      </div>

      <div className="form-legend">Contact Information</div>
      <div className="form-grid cols-2">
        <div className="field"><label htmlFor="fullname">Full Name</label><input type="text" id="fullname" name="fullname" placeholder="Your name" required /></div>
        <div className="field"><label htmlFor="email">Email Address</label><input type="email" id="email" name="email" placeholder="you@example.com" required /></div>
        <div className="field"><label htmlFor="country">Country of Residence</label><input type="text" id="country" name="country" placeholder="e.g. USA" /></div>
        <div className="field"><label htmlFor="whatsapp">WhatsApp Number</label><input type="tel" id="whatsapp" name="whatsapp" placeholder="+1 234 567 8900" /></div>
      </div>

      <div className="form-legend">Additional Information</div>
      <div className="form-grid cols-2">
        <div className="field"><label htmlFor="source">How did you hear about us?</label>
          <select id="source" name="source" defaultValue="Google Search">
            <option>Google Search</option>
            <option>Instagram / Facebook</option>
            <option>Tripadvisor</option>
            <option>Referral from a friend</option>
          </select>
        </div>
        <div className="field"><label htmlFor="notes">Special Requests / Notes</label><input type="text" id="notes" name="notes" placeholder="Optional" /></div>
      </div>

      <div className="form-submit">
        <button type="submit" className="btn btn-primary">Get Your Custom Itinerary</button>
        <div className={`form-success ${success ? "show" : ""}`}>✅ Thank you! Our travel experts will reach out within 24 hours.</div>
        <div className={`form-error ${error ? "show" : ""}`}>{error}</div>
      </div>
    </form>
  );
}
