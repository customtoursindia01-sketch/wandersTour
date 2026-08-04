import { Link } from "react-router-dom";

export default function PageHero({ title, breadcrumbs }) {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          {breadcrumbs.map((crumb, i) => (
            <span key={i}>
              <span className="sep">/</span>
              {crumb.to ? <Link to={crumb.to}>{crumb.label}</Link> : <span>{crumb.label}</span>}
            </span>
          ))}
        </div>
        <h1>{title}</h1>
      </div>
    </section>
  );
}
