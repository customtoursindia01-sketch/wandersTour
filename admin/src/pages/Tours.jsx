import ResourceManager from "../components/ResourceManager.jsx";

const columns = [
  { key: "image", label: "Image", render: (item) => <img className="thumb" src={item.image} alt={item.title} /> },
  { key: "title", label: "Title" },
  { key: "category", label: "Category (tab)" },
  { key: "duration", label: "Duration" },
  { key: "price", label: "Price", render: (item) => `${item.currency || "USD"} ${item.price}` },
];

const fields = [
  { name: "title", label: "Tour Title", required: true, placeholder: "e.g. Golden Triangle Tour" },
  {
    name: "category",
    label: "Category (creates/joins a tab on the public site)",
    required: true,
    placeholder: "e.g. Golden Triangle Tours",
  },
  { name: "duration", label: "Duration", required: true, placeholder: "e.g. 3 Days / 2 Nights" },
  { name: "route", label: "Route", required: true, placeholder: "e.g. Delhi – Agra – Jaipur" },
  { name: "price", label: "Price", type: "number", required: true },
  { name: "currency", label: "Currency", type: "select", options: ["USD", "EUR", "GBP", "INR"] },
  { name: "image", label: "Image URL", required: true, placeholder: "https://..." },
  { name: "description", label: "Description (optional)", type: "textarea" },
  { name: "order", label: "Display Order", type: "number" },
  { name: "isFeatured", label: "Featured", type: "checkbox" },
  { name: "isPublished", label: "Published (visible on the public site)", type: "checkbox" },
];

const defaultValues = {
  title: "",
  category: "",
  duration: "",
  route: "",
  price: 0,
  currency: "USD",
  image: "",
  description: "",
  order: 0,
  isFeatured: false,
  isPublished: true,
};

export default function Tours() {
  return (
    <ResourceManager
      resource="tours"
      title="Tours"
      columns={columns}
      fields={fields}
      defaultValues={defaultValues}
    />
  );
}
