import type { Metadata } from "next";
import CityPageClient from "../components/CityPageClient";
import type { CityData } from "../components/CityPageClient";

export const metadata: Metadata = {
  title: "Sub-Zero Repair Houston TX | WeRepairSubZero.com",
  description:
    "Expert Sub-Zero repair in Houston, TX. Independent certified specialists. Same-day service in River Oaks, Memorial, Galleria. Call (346) 413-8813.",
  alternates: { canonical: "https://werepairsubzero.com/houston/" },
};

const data: CityData = {
  city: "Houston",
  h1: "Sub-Zero Repair in Houston, TX",
  intro:
    "Houston is home to thousands of Sub-Zero appliances in luxury neighborhoods like River Oaks, Memorial, Tanglewood, and the Galleria area. When your Sub-Zero stops cooling or displays an error code, you need a specialist — not a general repair tech. We serve all Houston ZIP codes with same-day availability.",
  photo: "/IMG_4368.jpeg",
  photoAlt: "Sub-Zero refrigerator repair Houston TX",
  localBusinessSchema: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "WeRepairSubZero - Houston Sub-Zero Repair",
    description: "Independent Sub-Zero repair specialists serving all Houston neighborhoods. EPA 608 certified, fair market pricing.",
    url: "https://werepairsubzero.com/houston/",
    telephone: "+13464138813",
    address: {
      "@type": "PostalAddress",
      streetAddress: "11020 Katy Fwy Suite #117",
      addressLocality: "Houston",
      addressRegion: "TX",
      postalCode: "77043",
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: 29.7604, longitude: -95.3698 },
    openingHours: "Mo-Sa 08:00-18:00",
    priceRange: "$$",
    areaServed: "Houston, TX",
  },
  breadcrumbSchema: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://werepairsubzero.com/" },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://werepairsubzero.com/#service-areas" },
      { "@type": "ListItem", position: 3, name: "Houston", item: "https://werepairsubzero.com/houston/" },
    ],
  },
  faqs: [
    { q: "Do you serve River Oaks and the Galleria area?", a: "Yes — River Oaks, Galleria, Memorial, Tanglewood, and all central Houston neighborhoods are within our regular service area. We're in these ZIP codes every week." },
    { q: "Which Houston ZIP codes do you cover?", a: "We cover all Houston ZIP codes from 77001 through 77099, including River Oaks (77019), Memorial (77024), the Galleria (77056), Midtown (77006), and the Heights (77008)." },
    { q: "Can I get same-day Sub-Zero repair in Houston?", a: "In most cases, yes. We typically have same-day availability Monday through Saturday. Call by noon for the best chance of a same-day appointment." },
    { q: "What Sub-Zero models do you repair in Houston?", a: "All of them — PRO 48, Classic 36, Designer series, Integrated columns, undercounter units, and wine storage. We also repair Wolf and Cove appliances." },
    { q: "How much does Sub-Zero repair cost in Houston?", a: "The diagnostic visit is $120, waived if repair proceeds. Final cost depends on the issue — our technician gives you an exact quote before touching anything." },
    { q: "Do you repair Sub-Zero wine refrigerators in Houston?", a: "Yes. Wine storage units have their own quirks — humidity, vibration control, dual-zone temperature issues. We repair all Sub-Zero wine refrigerator models." },
    { q: "What's your service coverage within Houston city limits?", a: "We cover the entire City of Houston — from the Heights and Montrose to Meyerland, Clear Lake, and East Houston. No area is too far." },
    { q: "Are your Houston technicians licensed and insured?", a: "Yes. Every specialist in our network is independently licensed, EPA 608 certified for refrigerant handling, and carries personal liability insurance. Credentials available on request." },
  ],
  nearbyLinks: [
    { label: "Katy", href: "/katy/" },
    { label: "Bellaire", href: "/bellaire/" },
    { label: "Memorial", href: "/memorial/" },
  ],
};

export default function HoustonPage() {
  return <CityPageClient data={data} />;
}
