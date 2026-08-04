import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Tours from "./pages/Tours.jsx";
import Destinations from "./pages/Destinations.jsx";
import Themes from "./pages/Themes.jsx";
import Guides from "./pages/Guides.jsx";
import Testimonials from "./pages/Testimonials.jsx";
import Blog from "./pages/Blog.jsx";
import Faqs from "./pages/Faqs.jsx";
import Inquiries from "./pages/Inquiries.jsx";
import Settings from "./pages/Settings.jsx";
import Sidebar from "./components/Sidebar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">{children}</main>
    </div>
  );
}

function Protected({ children }) {
  return (
    <ProtectedRoute>
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Protected><Dashboard /></Protected>} />
      <Route path="/tours" element={<Protected><Tours /></Protected>} />
      <Route path="/destinations" element={<Protected><Destinations /></Protected>} />
      <Route path="/themes" element={<Protected><Themes /></Protected>} />
      <Route path="/guides" element={<Protected><Guides /></Protected>} />
      <Route path="/testimonials" element={<Protected><Testimonials /></Protected>} />
      <Route path="/blog" element={<Protected><Blog /></Protected>} />
      <Route path="/faqs" element={<Protected><Faqs /></Protected>} />
      <Route path="/inquiries" element={<Protected><Inquiries /></Protected>} />
      <Route path="/settings" element={<Protected><Settings /></Protected>} />
    </Routes>
  );
}
