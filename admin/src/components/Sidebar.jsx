import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";

const links = [
  { to: "/", label: "Dashboard", end: true },
];

const contentLinks = [
  { to: "/tours", label: "Tours" },
  { to: "/destinations", label: "Destinations" },
  { to: "/themes", label: "Tour Themes" },
  { to: "/guides", label: "Guides" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/blog", label: "Blog Posts" },
  { to: "/faqs", label: "FAQs" },
];

const otherLinks = [
  { to: "/inquiries", label: "Inquiries" },
  { to: "/settings", label: "Site Settings" },
];

export default function Sidebar() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="brand">Wander<span>India</span> Admin</div>
      <nav>
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end}>
            {l.label}
          </NavLink>
        ))}

        <div className="nav-group-label">Content</div>
        {contentLinks.map((l) => (
          <NavLink key={l.to} to={l.to}>
            {l.label}
          </NavLink>
        ))}

        <div className="nav-group-label">Manage</div>
        {otherLinks.map((l) => (
          <NavLink key={l.to} to={l.to}>
            {l.label}
          </NavLink>
        ))}
      </nav>
      <button className="logout-btn" onClick={handleLogout}>
        Logout {admin ? `(${admin.name})` : ""}
      </button>
    </aside>
  );
}
