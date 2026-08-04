function resolveApiBase() {
  const fromEnv = import.meta.env.VITE_API_URL?.trim();
  const onLocalHost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

  // Never use a localhost API URL when the site itself is hosted.
  if (fromEnv && !(fromEnv.includes("localhost") && !onLocalHost)) {
    return fromEnv.replace(/\/$/, "");
  }

  if (!onLocalHost && typeof window !== "undefined") {
    return "https://wanderstour.onrender.com/api";
  }

  return "http://localhost:5050/api";
}

const API = resolveApiBase();

export default async function api(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Request failed: ${res.status}`);
  }
  return res.json();
}
