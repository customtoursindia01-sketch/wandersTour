import { useEffect, useState } from "react";

export default function TestimonialSlider({ testimonials }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!testimonials?.length) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials]);

  if (!testimonials?.length) {
    return <p className="empty-text">No testimonials published yet.</p>;
  }

  return (
    <>
      <div className="testimonial-slider">
        {testimonials.map((t, i) => (
          <div key={t._id || i} className={`testimonial-slide ${i === current ? "active" : ""}`}>
            <div className="quote-mark">"</div>
            <p>{t.quote}</p>
            <div className="testimonial-author">
              <img
                src={t.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}`}
                alt={t.name}
              />
              <div>
                <div className="name">{t.name}</div>
                <div className="place">{t.place || ""}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="testimonial-dots">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={i === current ? "active" : ""}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </>
  );
}
