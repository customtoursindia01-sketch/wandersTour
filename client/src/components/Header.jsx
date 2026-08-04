import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSettings } from "../context/SettingsContext.jsx";
import BrandName from "./BrandName.jsx";

const tourLinks = [
  { label: "Golden Triangle Tours", category: "Golden Triangle Tours" },
  { label: "Rajasthan Tours", category: "Rajasthan Tours" },
  { label: "Same Day Tours", category: "Same Day Tours" },
  { label: "South India Tours", category: "South India Tours" },
];

export default function Header() {
  const { settings } = useSettings();
  const location = useLocation();
  const [navOpen, setNavOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const siteName = settings?.siteName || "Wander India Tours";
  const phone = settings?.phone || "Loading…";

  useEffect(() => {
    setNavOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", navOpen);
    return () => document.body.classList.remove("nav-open");
  }, [navOpen]);

  const isActive = (path) => location.pathname === path;

  const toggleDropdown = (name, e) => {
    if (window.innerWidth <= 960) {
      e.preventDefault();
      setOpenDropdown(openDropdown === name ? null : name);
    }
  };

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link to="/" className="logo">
          <BrandName name={siteName} />
        </Link>

        <nav>
          <ul className="nav-menu" id="navMenu">
            <li className={isActive("/") ? "active" : ""}>
              <Link to="/">Home</Link>
            </li>
            <li className={isActive("/destinations") ? "active" : ""}>
              <Link to="/destinations">Destinations</Link>
            </li>
            <li className={`has-dropdown ${openDropdown === "tours" ? "open" : ""}`}>
              <Link to="/tours" onClick={(e) => toggleDropdown("tours", e)}>Tours ▾</Link>
              <ul className="dropdown">
                {tourLinks.map((t) => (
                  <li key={t.category}>
                    <Link to={`/tours?category=${encodeURIComponent(t.category)}`}>{t.label}</Link>
                  </li>
                ))}
                <li><Link to="/tours">All Tour Packages</Link></li>
              </ul>
            </li>
            <li className={`has-dropdown ${openDropdown === "services" ? "open" : ""}`}>
              <a href="#" onClick={(e) => toggleDropdown("services", e)}>Services ▾</a>
              <ul className="dropdown">
                <li><Link to="/group-tours">Group Tours</Link></li>
                <li><Link to="/corporate-travel">Corporate Travel</Link></li>
                <li><Link to="/car-rental">Car Rental</Link></li>
              </ul>
            </li>
            <li className={isActive("/about") ? "active" : ""}>
              <Link to="/about">About Us</Link>
            </li>
            <li className={isActive("/blog") ? "active" : ""}>
              <Link to="/blog">Blog</Link>
            </li>
            <li className={isActive("/contact") ? "active" : ""}>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <div className="nav-actions">
          <div className="nav-phone">
            <span className="dot"></span> Talk to an expert: {phone}
          </div>
          <Link to="/contact" className="btn btn-primary btn-sm">Plan My Trip</Link>
          <button
            className="nav-toggle"
            id="navToggle"
            aria-label="Toggle menu"
            onClick={() => setNavOpen(!navOpen)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
