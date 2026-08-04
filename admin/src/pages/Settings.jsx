import { useEffect, useState } from "react";
import api from "../api.js";

export default function Settings() {
  const [settings, setSettings] = useState(null);
  const [stats, setStats] = useState(null);
  const [whyChooseUsText, setWhyChooseUsText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [settingsRes, statsRes] = await Promise.all([api.get("/settings"), api.get("/stats")]);
        setSettings(settingsRes.data);
        setStats(statsRes.data);
        setWhyChooseUsText((settingsRes.data.whyChooseUs || []).join("\n"));
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load settings");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSettingsChange = (name, value) => setSettings((prev) => ({ ...prev, [name]: value }));
  const handleStatsChange = (name, value) => setStats((prev) => ({ ...prev, [name]: Number(value) || 0 }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const settingsPayload = {
        ...settings,
        whyChooseUs: whyChooseUsText.split("\n").map((s) => s.trim()).filter(Boolean),
      };
      await api.put("/settings/admin", settingsPayload);
      await api.put("/stats/admin", stats);
      setMessage("Settings saved successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading settings…</p>;
  if (!settings || !stats) return <p>Could not load settings.</p>;

  return (
    <div>
      <div className="admin-topbar">
        <h1>Site Settings</h1>
      </div>

      {message && <div className="success-banner">{message}</div>}
      {error && <div className="error-banner">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="panel" style={{ marginBottom: 20 }}>
          <h2>Site Identity &amp; Contact</h2>
          <div className="field"><label>Site Name</label><input value={settings.siteName} onChange={(e) => handleSettingsChange("siteName", e.target.value)} /></div>
          <div className="field"><label>Tagline</label><input value={settings.tagline} onChange={(e) => handleSettingsChange("tagline", e.target.value)} /></div>
          <div className="field"><label>Phone</label><input value={settings.phone} onChange={(e) => handleSettingsChange("phone", e.target.value)} /></div>
          <div className="field"><label>Email</label><input value={settings.email} onChange={(e) => handleSettingsChange("email", e.target.value)} /></div>
          <div className="field"><label>Address</label><input value={settings.address} onChange={(e) => handleSettingsChange("address", e.target.value)} /></div>
          <div className="field"><label>WhatsApp Number (digits only, with country code)</label><input value={settings.whatsapp} onChange={(e) => handleSettingsChange("whatsapp", e.target.value)} /></div>
          <div className="field"><label>Facebook URL</label><input value={settings.facebookUrl} onChange={(e) => handleSettingsChange("facebookUrl", e.target.value)} /></div>
          <div className="field"><label>Instagram URL</label><input value={settings.instagramUrl} onChange={(e) => handleSettingsChange("instagramUrl", e.target.value)} /></div>
          <div className="field"><label>Tripadvisor URL</label><input value={settings.tripadvisorUrl} onChange={(e) => handleSettingsChange("tripadvisorUrl", e.target.value)} /></div>
        </div>

        <div className="panel" style={{ marginBottom: 20 }}>
          <h2>Homepage Hero</h2>
          <div className="field"><label>Hero Heading</label><input value={settings.heroHeading} onChange={(e) => handleSettingsChange("heroHeading", e.target.value)} /></div>
          <div className="field"><label>Hero Subheading</label><textarea rows={3} value={settings.heroSubheading} onChange={(e) => handleSettingsChange("heroSubheading", e.target.value)} /></div>
          <div className="field"><label>Hero Background Image URL</label><input value={settings.heroImage} onChange={(e) => handleSettingsChange("heroImage", e.target.value)} /></div>
        </div>

        <div className="panel" style={{ marginBottom: 20 }}>
          <h2>About Section</h2>
          <div className="field"><label>About Heading</label><input value={settings.aboutHeading} onChange={(e) => handleSettingsChange("aboutHeading", e.target.value)} /></div>
          <div className="field"><label>About Body</label><textarea rows={4} value={settings.aboutBody} onChange={(e) => handleSettingsChange("aboutBody", e.target.value)} /></div>
          <div className="field"><label>About Image URL</label><input value={settings.aboutImage} onChange={(e) => handleSettingsChange("aboutImage", e.target.value)} /></div>
          <div className="field"><label>"Why Choose Us" bullet points (one per line)</label><textarea rows={5} value={whyChooseUsText} onChange={(e) => setWhyChooseUsText(e.target.value)} /></div>
        </div>

        <div className="panel" style={{ marginBottom: 20 }}>
          <h2>Homepage Stat Counters</h2>
          <div className="field"><label>Happy Travelers</label><input type="number" value={stats.happyTravelers} onChange={(e) => handleStatsChange("happyTravelers", e.target.value)} /></div>
          <div className="field"><label>Tour Packages</label><input type="number" value={stats.tourPackages} onChange={(e) => handleStatsChange("tourPackages", e.target.value)} /></div>
          <div className="field"><label>Destinations Covered</label><input type="number" value={stats.destinationsCovered} onChange={(e) => handleStatsChange("destinationsCovered", e.target.value)} /></div>
          <div className="field"><label>Years of Experience</label><input type="number" value={stats.yearsOfExperience} onChange={(e) => handleStatsChange("yearsOfExperience", e.target.value)} /></div>
        </div>

        <button className="btn btn-primary" type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save All Settings"}
        </button>
      </form>
    </div>
  );
}
