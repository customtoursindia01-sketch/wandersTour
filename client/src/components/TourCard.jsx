import { Link } from "react-router-dom";
import { formatPrice } from "../utils.js";

export default function TourCard({ tour }) {
  return (
    <article className="tour-card">
      <div className="tour-media">
        <span className="tour-duration">{tour.duration}</span>
        <img src={tour.image} alt={tour.title} loading="lazy" />
      </div>
      <div className="tour-body">
        <h4>{tour.title}</h4>
        <div className="tour-route">📍 {tour.route}</div>
        <div className="tour-footer">
          <div className="tour-price">
            <span className="from">Starting from</span>
            <span className="amount">{formatPrice(tour.price, tour.currency)}</span>
          </div>
          <Link to={`/tours/${tour._id}`} className="btn btn-primary-dark btn-sm">View Tour</Link>
        </div>
      </div>
    </article>
  );
}
