import mongoose from "mongoose";

// Singleton document holding global site settings editable from the admin panel.
const siteSettingsSchema = new mongoose.Schema(
  {
    key: { type: String, default: "site-settings", unique: true },
    siteName: { type: String, default: "Wander India Tours" },
    tagline: { type: String, default: "Custom Tours, Trusted Guides, Unforgettable India." },
    heroHeading: {
      type: String,
      default: "Discover Incredible India with Trusted Local Experts",
    },
    heroSubheading: {
      type: String,
      default:
        "Private, hand-crafted tours across the Golden Triangle, Rajasthan and South India — comfortable cars, certified guides, and 24/7 on-ground support from arrival to departure.",
    },
    heroImage: {
      type: String,
      default: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1600&q=80",
    },
    aboutHeading: {
      type: String,
      default: "A Locally-Owned Tour Company Built on Trust",
    },
    aboutBody: {
      type: String,
      default:
        "Wander India Tours is a Jaipur-based tour operator founded by travel enthusiasts who wanted to show visitors an authentic, unhurried India. With over a decade of on-ground experience, our team designs private itineraries that put your comfort and curiosity first — never a rushed group schedule.",
    },
    aboutImage: {
      type: String,
      default: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=650&q=80",
    },
    whyChooseUs: {
      type: [String],
      default: [
        "No Forced Shopping — your time on tour is 100% yours.",
        "Guest-First Approach — itineraries built around your pace and interests.",
        "Certified Guides — fluent in English, French, Spanish & German.",
        "24/7 Ground Support — from airport pickup to departure.",
      ],
    },
    phone: { type: String, default: "+91 98765 43210" },
    email: { type: String, default: "hello@wanderindiatours.example" },
    address: { type: String, default: "Jaipur, Rajasthan, India" },
    whatsapp: { type: String, default: "919876543210" },
    facebookUrl: { type: String, default: "#" },
    instagramUrl: { type: String, default: "#" },
    tripadvisorUrl: { type: String, default: "#" },
  },
  { timestamps: true }
);

export default mongoose.model("SiteSettings", siteSettingsSchema);
