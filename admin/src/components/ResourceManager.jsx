import { useEffect, useState } from "react";
import api from "../api.js";

/**
 * Generic CRUD screen: fetches a list from `/admin/{resource}`, renders it as
 * a table using `columns`, and lets the admin create/edit/delete records
 * through a modal form built from `fields`. Used by every content page
 * (Tours, Destinations, Themes, Guides, Testimonials, Blog, FAQs) so the
 * same list/edit/delete logic isn't duplicated seven times.
 */
export default function ResourceManager({ resource, title, columns, fields, defaultValues = {} }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(defaultValues);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get(`/admin/${resource}`);
      setItems(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource]);

  const openCreate = () => {
    setEditingItem(null);
    setFormData(defaultValues);
    setFormError("");
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    const populated = { ...defaultValues };
    fields.forEach((f) => {
      populated[f.name] = item[f.name] ?? defaultValues[f.name] ?? "";
    });
    setFormData(populated);
    setFormError("");
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError("");
    try {
      const payload = { ...formData };
      fields.forEach((f) => {
        if (f.type === "number") payload[f.name] = Number(payload[f.name]) || 0;
      });

      if (editingItem) {
        await api.put(`/admin/${resource}/${editingItem._id}`, payload);
      } else {
        await api.post(`/admin/${resource}`, payload);
      }
      setModalOpen(false);
      await load();
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to save. Check the fields and try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    const label = item.title || item.name || item.question || "this item";
    if (!window.confirm(`Delete "${label}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/admin/${resource}/${item._id}`);
      await load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <div>
      <div className="admin-topbar">
        <h1>{title}</h1>
        <button className="btn btn-primary" onClick={openCreate}>
          + Add New
        </button>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="panel">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.key}>{c.label}</th>
              ))}
              <th>Published</th>
              <th style={{ width: 160 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr className="loading-row">
                <td colSpan={columns.length + 2}>Loading…</td>
              </tr>
            )}
            {!loading && items.length === 0 && (
              <tr className="empty-row">
                <td colSpan={columns.length + 2}>No records yet. Click "Add New" to create one.</td>
              </tr>
            )}
            {!loading &&
              items.map((item) => (
                <tr key={item._id}>
                  {columns.map((c) => (
                    <td key={c.key}>{c.render ? c.render(item) : item[c.key]}</td>
                  ))}
                  <td>
                    <span className={`badge ${item.isPublished === false ? "badge-no" : "badge-yes"}`}>
                      {item.isPublished === false ? "Hidden" : "Live"}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button className="btn btn-outline btn-sm" onClick={() => openEdit(item)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editingItem ? `Edit ${title.slice(0, -1)}` : `Add New ${title.slice(0, -1)}`}</h3>

            {formError && <div className="error-banner">{formError}</div>}

            <form onSubmit={handleSubmit}>
              {fields.map((f) => (
                <div className={`field ${f.type === "checkbox" ? "checkbox-field" : ""}`} key={f.name}>
                  {f.type === "checkbox" ? (
                    <>
                      <input
                        type="checkbox"
                        id={f.name}
                        checked={Boolean(formData[f.name])}
                        onChange={(e) => handleChange(f.name, e.target.checked)}
                      />
                      <label htmlFor={f.name}>{f.label}</label>
                    </>
                  ) : f.type === "textarea" ? (
                    <>
                      <label htmlFor={f.name}>{f.label}</label>
                      <textarea
                        id={f.name}
                        rows={f.rows || 3}
                        value={formData[f.name] ?? ""}
                        onChange={(e) => handleChange(f.name, e.target.value)}
                        required={f.required}
                      />
                    </>
                  ) : f.type === "select" ? (
                    <>
                      <label htmlFor={f.name}>{f.label}</label>
                      <select
                        id={f.name}
                        value={formData[f.name] ?? ""}
                        onChange={(e) => handleChange(f.name, e.target.value)}
                        required={f.required}
                      >
                        {f.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <>
                      <label htmlFor={f.name}>{f.label}</label>
                      <input
                        id={f.name}
                        type={f.type || "text"}
                        value={formData[f.name] ?? ""}
                        placeholder={f.placeholder || ""}
                        onChange={(e) => handleChange(f.name, e.target.value)}
                        required={f.required}
                      />
                    </>
                  )}
                  {formData[f.name] && f.name.toLowerCase().includes("image") && (
                    <img src={formData[f.name]} alt="preview" style={{ marginTop: 6, width: 80, height: 80, objectFit: "cover", borderRadius: 8 }} onError={(e) => (e.target.style.display = "none")} />
                  )}
                </div>
              ))}

              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
