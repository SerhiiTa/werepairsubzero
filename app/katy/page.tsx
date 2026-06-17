import type { Metadata } from "next";
import CityPageClient from "../components/CityPageClient";
import type { CityData } from "../components/CityPageClient";

export const metadata: Metadata = {
  title: "Sub-Zero Repair Katy TX | Same-Day Service | WeRepairSubZero.com",
  description:
    "Sub-Zero appliance repair in Katy, TX. Cinco Ranch, Grand Lakes, Seven Meadows. Certified specialists. Call (346) 413-8813 for same-day service.",
  alternates: { canonical: "https://werepairsubzero.com/katy/" },
};

const data: CityData = {
  city: "Katy",
  h1: "Sub-Zero Repair in Katy, TX",
  intro:
    "Katy's master-planned communities like Cinco Ranch, Grand Lakes, and Seven Meadows are home to some of Houston's finest kitchens — many featuring Sub-Zero refrigeration. Our technicians service all Katy ZIP codes including 77494, 77450, and 77449 with prompt, professional repairs.",
  photo: "/IMG_5910.jpeg",
  photoAlt: "Sub-Zero refrigerator repair Katy TX",
  photoPosition: "top",
  localBusinessSchema: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "WeRepairSubZero - Katy Sub-Zero Repair",
    description: "Independent Sub-Zero repair specialists serving Katy TX — Cinco Ranch, Grand Lakes, Seven Meadows, and all Katy ZIP codes.",
    url: "https://werepairsubzero.com/katy/",
    telephone: "+13464138813",
    address: {
      "@type": "PostalAddress",
      streetAddress: "11020 Katy Fwy Suite #117",
      addressLocality: "Houston",
      addressRegion: "TX",
      postalCode: "77043",
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: 29.7858, longitude: -95.8245 },
    openingHours: "Mo-Sa 08:00-18:00",
    priceRange: "$$",
    areaServed: "Katy, TX",
  },
  breadcrumbSchema: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://werepairsubzero.com/" },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://werepairsubzero.com/#service-areas" },
      { "@type": "ListItem", position: 3, name: "Katy", item: "https://werepairsubzero.com/katy/" },
    ],
  },
  faqs: [
    { q: "Do you service Cinco Ranch in Katy?", a: "Yes — Cinco Ranch is one of our busiest areas in the Katy/West Houston corridor. We have technicians familiar with all Cinco Ranch communities and their Sub-Zero installations." },
    { q: "Which Katy ZIP codes do you serve?", a: "We cover 77494 (Cinco Ranch area), 77450 (central Katy), and 77449 (East Katy / Katy Mills area), as well as surrounding communities." },
    { q: "Can I get same-day Sub-Zero repair in Katy?", a: "Yes, most days. We serve Katy Monday through Saturday and typically have same-day slots available, especially for urgent issues like no cooling or error codes." },
    { q: "Do you service Seven Meadows and Grand Lakes?", a: "Yes. Seven Meadows, Grand Lakes, Canyon Lakes West, and surrounding planned communities are all within our regular Katy service area." },
    { q: "What's the diagnostic fee for Katy area?", a: "$120, which is fully waived if you proceed with the repair. No hidden fees or mileage charges for any Katy ZIP code." },
    { q: "How long does Sub-Zero repair usually take in Katy?", a: "Most repairs are completed in one visit — typically 1 to 2 hours. If a part needs to be ordered, we can often source it same-day or the following morning." },
    { q: "Do you repair built-in Sub-Zero refrigerators in Katy custom homes?", a: "Yes. Built-in and integrated models are our specialty. We work carefully around cabinetry and never remove panels unnecessarily." },
    { q: "What brands besides Sub-Zero do you repair in Katy?", a: "In addition to Sub-Zero, we service Viking, Thermador, Jenn-Air, KitchenAid, Dacor, Wolf, and Cove appliances throughout the Katy area." },
  ],
  nearbyLinks: [
    { label: "Houston", href: "/houston/" },
    { label: "Sugar Land", href: "/sugar-land/" },
    { label: "Memorial", href: "/memorial/" },
  ],
};

export default function KatyPage() {
  return <CityPageClient data={data} />;
}
