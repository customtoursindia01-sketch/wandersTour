import { useEffect, useRef } from "react";

const LABELS = {
  happyTravelers: "Happy Travelers",
  tourPackages: "Tour Packages",
  destinationsCovered: "Destinations Covered",
  yearsOfExperience: "Years of Experience",
};

export default function StatsStrip({ stats }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!stats || !containerRef.current) return;

    const counters = containerRef.current.querySelectorAll(".stat-number");
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = Number(el.dataset.count) || 0;
          const duration = 1400;
          const startTime = performance.now();

          function tick(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            el.textContent = Math.floor(progress * target).toLocaleString();
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = `${target.toLocaleString()}+`;
          }
          requestAnimationFrame(tick);
          obs.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [stats]);

  if (!stats) return <p className="loading-text">Loading stats…</p>;

  return (
    <div className="container stats-strip">
      <div className="stats-card" ref={containerRef}>
        {Object.entries(LABELS).map(([key, label]) => (
          <div className="stat" key={key}>
            <div className="stat-number" data-count={stats[key] ?? 0}>0</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
