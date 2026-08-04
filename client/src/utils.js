export function formatPrice(price, currency = "USD") {
  const symbols = { USD: "$", EUR: "€", GBP: "£", INR: "₹" };
  const symbol = symbols[currency] || "";
  return `${symbol}${Number(price).toLocaleString()}`;
}

export function slugify(text) {
  return (text || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
