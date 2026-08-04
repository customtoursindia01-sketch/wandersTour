import Admin from "../models/Admin.js";
import Tour from "../models/Tour.js";
import Destination from "../models/Destination.js";
import ThemeCategory from "../models/ThemeCategory.js";
import Guide from "../models/Guide.js";
import Testimonial from "../models/Testimonial.js";
import BlogPost from "../models/BlogPost.js";
import Faq from "../models/Faq.js";
import Stat from "../models/Stat.js";
import SiteSettings from "../models/SiteSettings.js";

const tours = [
  { title: "Golden Triangle Tour", category: "Golden Triangle Tours", duration: "3 Days / 2 Nights", route: "Delhi – Agra – Jaipur", price: 199, image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=700&q=80", order: 1 },
  { title: "Golden Triangle with Varanasi", category: "Golden Triangle Tours", duration: "5 Days / 4 Nights", route: "Delhi → Agra → Jaipur → Varanasi", price: 549, image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=700&q=80", order: 2 },
  { title: "Golden Triangle with Haridwar & Rishikesh", category: "Golden Triangle Tours", duration: "6 Days / 5 Nights", route: "Delhi → Agra → Jaipur → Haridwar → Rishikesh", price: 610, image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=700&q=80", order: 3 },
  { title: "Classical Rajasthan Tour", category: "Rajasthan Tours", duration: "10 Days / 9 Nights", route: "Delhi – Jaipur – Jodhpur – Udaipur", price: 890, image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=700&q=80", order: 1 },
  { title: "Royal Rajasthan with Taj Mahal", category: "Rajasthan Tours", duration: "12 Days / 11 Nights", route: "Delhi – Agra – Rajasthan", price: 1050, image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=700&q=80", order: 2 },
  { title: "Tiger Trails of Rajasthan", category: "Rajasthan Tours", duration: "8 Days / 7 Nights", route: "Jaipur – Ranthambore – Sawai Madhopur", price: 760, image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=700&q=80", order: 3 },
  { title: "Same Day Jaipur City Tour", category: "Same Day Tours", duration: "Same Day", route: "Hawa Mahal – Amber Fort – City Palace", price: 65, image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=700&q=80", order: 1 },
  { title: "Same Day Taj Mahal Tour from Jaipur", category: "Same Day Tours", duration: "Same Day", route: "Jaipur – Agra – Jaipur", price: 85, image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=700&q=80", order: 2 },
  { title: "Same Day Ranthambore Safari", category: "Same Day Tours", duration: "Same Day", route: "Jaipur – Ranthambore National Park", price: 190, image: "https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?w=700&q=80", order: 3 },
  { title: "Kerala Backwater & Culture Tour", category: "South India Tours", duration: "9 Days / 8 Nights", route: "Kochi – Munnar – Alleppey – Kovalam", price: 820, image: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?w=700&q=80", order: 1 },
  { title: "South India Heritage Tour", category: "South India Tours", duration: "12 Days / 11 Nights", route: "Kerala – Tamil Nadu – Karnataka", price: 945, image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=700&q=80", order: 2 },
  { title: "Same Day Mahabalipuram Tour", category: "South India Tours", duration: "Same Day", route: "Chennai – Mahabalipuram – Chennai", price: 70, image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=700&q=80", order: 3 },
];

const destinations = [
  { name: "North India", tagline: "12 curated tours", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&q=80", order: 1 },
  { name: "South India", tagline: "9 curated tours", image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=500&q=80", order: 2 },
  { name: "North East India", tagline: "5 curated tours", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&q=80", order: 3 },
  { name: "Central India", tagline: "6 curated tours", image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=500&q=80", order: 4 },
];

const themes = [
  { name: "Golden Triangle", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=200&q=80", order: 1 },
  { name: "Group Tours", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=200&q=80", order: 2 },
  { name: "Solo Tours", image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=200&q=80", order: 3 },
  { name: "Wildlife Tours", image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=200&q=80", order: 4 },
  { name: "Custom-Made Tours", image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=200&q=80", order: 5 },
  { name: "Family Tours", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=200&q=80", order: 6 },
  { name: "Honeymoon Tours", image: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?w=200&q=80", order: 7 },
  { name: "Photography Tours", image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=200&q=80", order: 8 },
];

const guides = [
  { name: "Arjun Rathore", photo: "https://ui-avatars.com/api/?name=Arjun+Rathore&background=0f6e6e&color=fff&size=300", languages: "English & French", order: 1 },
  { name: "Vikram Shekhawat", photo: "https://ui-avatars.com/api/?name=Vikram+Shekhawat&background=f5891f&color=fff&size=300", languages: "English & Spanish", order: 2 },
  { name: "Deepak Meena", photo: "https://ui-avatars.com/api/?name=Deepak+Meena&background=0a4f4f&color=fff&size=300", languages: "English & German", order: 3 },
];

const testimonials = [
  { name: "Charlotte G.", place: "France", quote: "Our guide was incredibly knowledgeable and made the Golden Triangle come alive. Every detail of the trip was handled — we didn't have to worry about a thing.", avatar: "https://ui-avatars.com/api/?name=Charlotte+G&background=e6f4f3&color=0f6e6e", order: 1 },
  { name: "Marc T.", place: "Belgium", quote: "Travelling with four kids across Rajasthan sounded stressful, but our driver and guide made it effortless. Clear explanations and genuine patience throughout.", avatar: "https://ui-avatars.com/api/?name=Marc+T&background=e6f4f3&color=0f6e6e", order: 2 },
  { name: "Usha I.", place: "USA", quote: "Travelling solo as a woman, I felt completely safe the whole trip. Our guide was engaging and shared so much history at every stop in Jaipur and Agra.", avatar: "https://ui-avatars.com/api/?name=Usha+I&background=e6f4f3&color=0f6e6e", order: 3 },
];

const blogPosts = [
  { title: "Walking Tours of India: Explore On Foot", excerpt: "The narrow lanes are best explored slowly — here's how to see India's old quarters step by step.", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&q=80", publishedOn: new Date("2026-07-31"), order: 1 },
  { title: "A Complete Guide to Wildlife Photography Tours", excerpt: "From Ranthambore's tigers to migratory birds — our tips for planning a wildlife photography trip.", image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=500&q=80", publishedOn: new Date("2026-06-29"), order: 2 },
  { title: "Top 7 Places to See Snowfall in India", excerpt: "Yes, it really does snow in India — here are the best hill towns to catch it this winter.", image: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?w=500&q=80", publishedOn: new Date("2026-06-16"), order: 3 },
];

const faqs = [
  { question: "Is India safe for tourists?", answer: "Yes. All our tours are private and supported 24/7, with vetted drivers and guides to ensure a safe, comfortable experience.", order: 1 },
  { question: "Do I need a visa to visit India?", answer: "Most travelers require a visa or e-Visa. We can share guidance on the application process once you book your tour.", order: 2 },
  { question: "Are the tours private?", answer: "Yes, every itinerary is private for your group — we don't mix travelers into large bus tours.", order: 3 },
  { question: "What languages do guides speak?", answer: "Our certified guides speak English plus French, Spanish or German depending on availability and region.", order: 4 },
  { question: "What's included in the price?", answer: "Transport, driver, accommodation as selected, guided sightseeing, and 24/7 support. Flights and personal expenses are excluded.", order: 5 },
  { question: "Can I customize my itinerary?", answer: "Absolutely — every package on this site is a starting point. Tell us your dates and interests and we'll tailor it.", order: 6 },
];

/**
 * Seeds default demo content. Safe to call on every server startup: each
 * collection is only populated if it is currently empty, so it never
 * overwrites content an admin has already edited. Pass `force: true` to
 * wipe and reseed collections regardless (used by the `npm run seed` CLI).
 */
export const seedDatabase = async ({ force = false } = {}) => {
  const seedIfEmpty = async (Model, data, label) => {
    if (force) await Model.deleteMany({});
    const count = await Model.countDocuments();
    if (count === 0) {
      await Model.insertMany(data);
      console.log(`Seeded ${data.length} ${label}`);
    }
  };

  await seedIfEmpty(Tour, tours, "tours");
  await seedIfEmpty(Destination, destinations, "destinations");
  await seedIfEmpty(ThemeCategory, themes, "theme categories");
  await seedIfEmpty(Guide, guides, "guides");
  await seedIfEmpty(Testimonial, testimonials, "testimonials");
  await seedIfEmpty(BlogPost, blogPosts, "blog posts");
  await seedIfEmpty(Faq, faqs, "FAQs");

  await Stat.findOneAndUpdate({ key: "site-stats" }, {}, { upsert: true });
  await SiteSettings.findOneAndUpdate({ key: "site-settings" }, {}, { upsert: true });

  const adminEmail = (process.env.SEED_ADMIN_EMAIL || "admin@wanderindiatours.example").toLowerCase();
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "Admin@12345";

  const existingAdmin = await Admin.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await Admin.create({ name: "Site Administrator", email: adminEmail, password: adminPassword });
    console.log(`Admin account ready -> email: ${adminEmail} / password: ${adminPassword}`);
  }
};
