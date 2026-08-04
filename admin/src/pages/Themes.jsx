import ResourceManager from "../components/ResourceManager.jsx";

const columns = [
  { key: "image", label: "Image", render: (item) => <img className="thumb" src={item.image} alt={item.name} /> },
  { key: "name", label: "Theme Name" },
];

const fields = [
  { name: "name", label: "Theme Name", required: true, placeholder: "e.g. Honeymoon Tours" },
  { name: "image", label: "Image URL", required: true, placeholder: "https://..." },
  { name: "order", label: "Display Order", type: "number" },
  { name: "isPublished", label: "Published (visible on the public site)", type: "checkbox" },
];

const defaultValues = { name: "", image: "", order: 0, isPublished: true };

export default function Themes() {
  return (
    <ResourceManager
      resource="themes"
      title="Tour Themes"
      columns={columns}
      fields={fields}
      defaultValues={defaultValues}
    />
  );
}
