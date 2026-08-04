import ResourceManager from "../components/ResourceManager.jsx";

const columns = [
  { key: "avatar", label: "Avatar", render: (item) => <img className="thumb" src={item.avatar} alt={item.name} /> },
  { key: "name", label: "Name" },
  { key: "place", label: "Place" },
  { key: "quote", label: "Quote", render: (item) => (item.quote.length > 60 ? `${item.quote.slice(0, 60)}…` : item.quote) },
];

const fields = [
  { name: "name", label: "Guest Name", required: true, placeholder: "e.g. Charlotte G." },
  { name: "place", label: "Country / Place", placeholder: "e.g. France" },
  { name: "quote", label: "Quote", type: "textarea", required: true, rows: 4 },
  { name: "avatar", label: "Avatar Image URL", placeholder: "https://..." },
  { name: "order", label: "Display Order", type: "number" },
  { name: "isPublished", label: "Published (visible on the public site)", type: "checkbox" },
];

const defaultValues = { name: "", place: "", quote: "", avatar: "", order: 0, isPublished: true };

export default function Testimonials() {
  return (
    <ResourceManager
      resource="testimonials"
      title="Testimonials"
      columns={columns}
      fields={fields}
      defaultValues={defaultValues}
    />
  );
}
