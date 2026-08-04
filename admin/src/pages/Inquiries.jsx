import { useEffect, useState } from "react";
import api from "../api.js";

const STATUS_OPTIONS = ["new", "contacted", "confirmed", "closed"];

const badgeColor = {
  new: "badge-yes",
  contacted: "badge-yes",
  confirmed: "badge-yes",
  closed: "badge-no",
};

export default function Inquiries() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/inquiries/admin");
      setItems(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/inquiries/admin/${id}`, { status });
    load();
  };

  const remove = async (item) => {
    if (!window.confirm(`Delete inquiry from ${item.fullName}?`)) return;
    await api.delete(`/inquiries/admin/${item._id}`);
    if (selected?._id === item._id) setSelected(null);
    load();
  };

  return (
    <div>
      <div className="admin-topbar">
        <h1>Itinerary Inquiries</h1>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="panel">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Destination</th>
              <th>Travelers</th>
              <th>Submitted</th>
              <th>Status</th>
              <th style={{ width: 180 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr className="loading-row">
                <td colSpan={7}>Loading…</td>
              </tr>
            )}
            {!loading && items.length === 0 && (
              <tr className="empty-row">
                <td colSpan={7}>No inquiries submitted yet.</td>
              </tr>
            )}
            {!loading &&
              items.map((item) => (
                <tr key={item._id}>
                  <td>{item.fullName}</td>
                  <td>{item.email}</td>
                  <td>{item.destination || "—"}</td>
                  <td>{item.travelers}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge ${badgeColor[item.status] || "badge-yes"}`}>{item.status}</span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button className="btn btn-outline btn-sm" onClick={() => setSelected(item)}>
                        View
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => remove(item)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Inquiry from {selected.fullName}</h3>
            <div className="field">
              <label>Status</label>
              <select value={selected.status} onChange={(e) => { updateStatus(selected._id, e.target.value); setSelected({ ...selected, status: e.target.value }); }}>
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <p><strong>Email:</strong> {selected.email}</p>
            <p><strong>WhatsApp:</strong> {selected.whatsapp || "—"}</p>
            <p><strong>Country:</strong> {selected.country || "—"}</p>
            <p><strong>Travel dates:</strong> {selected.arrivalDate || "—"} to {selected.departureDate || "—"}</p>
            <p><strong>Travelers:</strong> {selected.travelers}</p>
            <p><strong>Destination:</strong> {selected.destination || "—"}</p>
            <p><strong>Accommodation:</strong> {selected.accommodation || "—"}</p>
            <p><strong>Budget:</strong> {selected.budget || "—"}</p>
            <p><strong>Heard about us via:</strong> {selected.source || "—"}</p>
            <p><strong>Notes:</strong> {selected.notes || "—"}</p>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
