import ResourceManager from "../components/ResourceManager.jsx";

const columns = [
  { key: "image", label: "Image", render: (item) => <img className="thumb" src={item.image} alt={item.title} /> },
  { key: "title", label: "Title" },
  { key: "publishedOn", label: "Published On", render: (item) => new Date(item.publishedOn).toLocaleDateString() },
];

const fields = [
  { name: "title", label: "Post Title", required: true },
  { name: "excerpt", label: "Excerpt", type: "textarea", required: true, rows: 3 },
  { name: "image", label: "Image URL", required: true, placeholder: "https://..." },
  { name: "link", label: "Link (optional, defaults to #)", placeholder: "https://..." },
  { name: "publishedOn", label: "Published On", type: "date" },
  { name: "order", label: "Display Order", type: "number" },
  { name: "isPublished", label: "Published (visible on the public site)", type: "checkbox" },
];

const defaultValues = {
  title: "",
  excerpt: "",
  image: "",
  link: "#",
  publishedOn: new Date().toISOString().slice(0, 10),
  order: 0,
  isPublished: true,
};

export default function Blog() {
  return (
    <ResourceManager
      resource="blog"
      title="Blog Posts"
      columns={columns}
      fields={fields}
      defaultValues={defaultValues}
    />
  );
}
