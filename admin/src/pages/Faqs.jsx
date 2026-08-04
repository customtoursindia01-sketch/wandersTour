import ResourceManager from "../components/ResourceManager.jsx";

const columns = [
  { key: "question", label: "Question" },
  { key: "answer", label: "Answer", render: (item) => (item.answer.length > 70 ? `${item.answer.slice(0, 70)}…` : item.answer) },
];

const fields = [
  { name: "question", label: "Question", required: true },
  { name: "answer", label: "Answer", type: "textarea", required: true, rows: 4 },
  { name: "order", label: "Display Order", type: "number" },
  { name: "isPublished", label: "Published (visible on the public site)", type: "checkbox" },
];

const defaultValues = { question: "", answer: "", order: 0, isPublished: true };

export default function Faqs() {
  return (
    <ResourceManager
      resource="faqs"
      title="FAQs"
      columns={columns}
      fields={fields}
      defaultValues={defaultValues}
    />
  );
}
