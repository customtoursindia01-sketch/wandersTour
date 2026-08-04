import ResourceManager from "../components/ResourceManager.jsx";

const columns = [
  { key: "photo", label: "Photo", render: (item) => <img className="thumb" src={item.photo} alt={item.name} /> },
  { key: "name", label: "Name" },
  { key: "tag", label: "Tag" },
  { key: "languages", label: "Languages" },
];

const fields = [
  { name: "name", label: "Guide Name", required: true, placeholder: "e.g. Arjun Rathore" },
  { name: "photo", label: "Photo URL", required: true, placeholder: "https://..." },
  { name: "tag", label: "Tag", placeholder: "e.g. Government-Approved Guide" },
  { name: "languages", label: "Languages", required: true, placeholder: "e.g. English & French" },
  { name: "order", label: "Display Order", type: "number" },
  { name: "isPublished", label: "Published (visible on the public site)", type: "checkbox" },
];

const defaultValues = {
  name: "",
  photo: "",
  tag: "Government-Approved Guide",
  languages: "",
  order: 0,
  isPublished: true,
};

export default function Guides() {
  return (
    <ResourceManager
      resource="guides"
      title="Guides"
      columns={columns}
      fields={fields}
      defaultValues={defaultValues}
    />
  );
}
