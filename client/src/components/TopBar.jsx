import { useSettings } from "../context/SettingsContext.jsx";

export default function TopBar() {
  const { settings } = useSettings();
  const phone = settings?.phone || "Loading…";
  const email = settings?.email || "Loading…";
  const address = settings?.address || "Loading…";

  return (
    <div className="topbar">
      <div className="container">
        <div className="topbar-left">
          <a href={`tel:${phone.replace(/\s+/g, "")}`}>📞 {phone}</a>
          <a href={`mailto:${email}`}>✉ {email}</a>
        </div>
        <div className="topbar-right">
          <span>{address}</span>
          <div className="topbar-social">
            <a href={settings?.facebookUrl || "#"} aria-label="Facebook">FB</a>
            <a href={settings?.instagramUrl || "#"} aria-label="Instagram">IG</a>
            <a href={settings?.tripadvisorUrl || "#"} aria-label="Tripadvisor">TA</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function useSiteName() {
  const { settings } = useSettings();
  return settings?.siteName || "Wander India Tours";
}
