import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Tours from "./pages/Tours.jsx";
import TourDetail from "./pages/TourDetail.jsx";
import Destinations from "./pages/Destinations.jsx";
import Blog from "./pages/Blog.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import Contact from "./pages/Contact.jsx";
import Faqs from "./pages/Faqs.jsx";
import GroupTours from "./pages/GroupTours.jsx";
import CorporateTravel from "./pages/CorporateTravel.jsx";
import CarRental from "./pages/CarRental.jsx";
import Terms from "./pages/Terms.jsx";
import Privacy from "./pages/Privacy.jsx";
import Cancellation from "./pages/Cancellation.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tours/:id" element={<TourDetail />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogPost />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faqs" element={<Faqs />} />
      <Route path="/group-tours" element={<GroupTours />} />
      <Route path="/corporate-travel" element={<CorporateTravel />} />
      <Route path="/car-rental" element={<CarRental />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/cancellation" element={<Cancellation />} />
    </Routes>
  );
}
