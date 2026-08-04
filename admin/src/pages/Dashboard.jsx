import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api.js";

const RESOURCES = [
  { key: "tours", label: "Tours", path: "/tours" },
  { key: "destinations", label: "Destinations", path: "/destinations" },
  { key: "themes", label: "Tour Themes", path: "/themes" },
  { key: "guides", label: "Guides", path: "/guides" },
  { key: "testimonials", label: "Testimonials", path: "/testimonials" },
  { key: "blog", label: "Blog Posts", path: "/blog" },
  { key: "faqs", label: "FAQs", path: "/faqs" },
];

export default function Dashboard() {
  const [counts, setCounts] = useState({});
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const results = await Promise.all(RESOURCES.map((r) => api.get(`/admin/${r.key}`)));
        const nextCounts = {};
        results.forEach((res, i) => (nextCounts[RESOURCES[i].key] = res.data.length));
        setCounts(nextCounts);

        const { data } = await api.get("/inquiries/admin");
        setInquiries(data.slice(0, 5));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <div className="admin-topbar">
        <h1>Dashboard</h1>
      </div>

      <div className="stat-cards">
        {RESOURCES.map((r) => (
          <Link key={r.key} to={r.path} className="stat-card" style={{ display: "block" }}>
            <div className="num">{loading ? "…" : counts[r.key] ?? 0}</div>
            <div className="label">{r.label}</div>
          </Link>
        ))}
        <Link to="/inquiries" className="stat-card" style={{ display: "block" }}>
          <div className="num">{loading ? "…" : inquiries.length}</div>
          <div className="label">Recent Inquiries</div>
        </Link>
      </div>

      <div className="panel">
        <h2>Latest Itinerary Inquiries</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Destination</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {!loading && inquiries.length === 0 && (
              <tr className="empty-row">
                <td colSpan={4}>No inquiries yet.</td>
              </tr>
            )}
            {inquiries.map((inq) => (
              <tr key={inq._id}>
                <td>{inq.fullName}</td>
                <td>{inq.email}</td>
                <td>{inq.destination || "—"}</td>
                <td><span className="badge badge-yes">{inq.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
