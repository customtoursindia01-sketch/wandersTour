export default function BrandName({ name }) {
  const words = (name || "").trim().split(" ");
  if (words.length < 2) return name || "";
  const last = words.pop();
  return (
    <>
      {words.join(" ")} <span>{last}</span>
    </>
  );
}
