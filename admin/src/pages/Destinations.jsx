import ResourceManager from "../components/ResourceManager.jsx";

const columns = [
  { key: "image", label: "Image", render: (item) => <img className="thumb" src={item.image} alt={item.name} /> },
  { key: "name", label: "Name" },
  { key: "tagline", label: "Tagline" },
];

const fields = [
  { name: "name", label: "Destination Name", required: true, placeholder: "e.g. North India" },
  { name: "tagline", label: "Tagline", placeholder: "e.g. 12 curated tours" },
  { name: "image", label: "Image URL", required: true, placeholder: "https://..." },
  { name: "order", label: "Display Order", type: "number" },
  { name: "isPublished", label: "Published (visible on the public site)", type: "checkbox" },
];

const defaultValues = { name: "", tagline: "", image: "", order: 0, isPublished: true };

export default function Destinations() {
  return (
    <ResourceManager
      resource="destinations"
      title="Destinations"
      columns={columns}
      fields={fields}
      defaultValues={defaultValues}
    />
  );
}
