import type { Metadata } from "next";
import CityPageClient from "../components/CityPageClient";
import type { CityData } from "../components/CityPageClient";

export const metadata: Metadata = {
  title: "Sub-Zero Repair Memorial Houston TX | WeRepairSubZero.com",
  description:
    "Sub-Zero repair in Memorial, Houston TX. Serving Memorial Villages, Tanglewood, Spring Branch. Independent certified specialists. Call (346) 413-8813.",
  alternates: { canonical: "https://werepairsubzero.com/memorial/" },
};

const data: CityData = {
  city: "Memorial",
  h1: "Sub-Zero Repair in Memorial, Houston TX",
  intro:
    "The Memorial area — encompassing the six Memorial Villages, Tanglewood, and Spring Branch — is one of Houston's most prestigious residential corridors. Homes here regularly feature Sub-Zero built-in refrigerators, wine storage units, and undercounter freezers. Our technicians know this area well and provide expert service with fair, transparent pricing.",
  photo: "/IMG_5562.jpeg",
  photoAlt: "Sub-Zero refrigerator repair Memorial Houston TX",
  localBusinessSchema: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "WeRepairSubZero - Memorial Houston Sub-Zero Repair",
    description: "Independent Sub-Zero repair specialists serving Memorial Houston — six Memorial Villages, Tanglewood, and Spring Branch.",
    url: "https://werepairsubzero.com/memorial/",
    telephone: "+13464138813",
    address: {
      "@type": "PostalAddress",
      streetAddress: "11020 Katy Fwy Suite #117",
      addressLocality: "Houston",
      addressRegion: "TX",
      postalCode: "77043",
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: 29.7654, longitude: -95.5277 },
    openingHours: "Mo-Sa 08:00-18:00",
    priceRange: "$$",
    areaServed: "Memorial, Houston TX",
  },
  breadcrumbSchema: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://werepairsubzero.com/" },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://werepairsubzero.com/#service-areas" },
      { "@type": "ListItem", position: 3, name: "Memorial", item: "https://werepairsubzero.com/memorial/" },
    ],
  },
  faqs: [
    { q: "Do you serve all six Memorial Villages?", a: "Yes — Hunters Creek, Piney Point, Bunker Hill, Spring Valley, Hedwig Village, and Hilshire Village are all within our service area. We work in these communities every week." },
    { q: "What about Hunters Creek Village?", a: "Yes. Hunters Creek is one of the most active areas for Sub-Zero repair in our network. Many homes there feature built-in Sub-Zero refrigeration and Wolf ranges." },
    { q: "Do you service Piney Point and Bunker Hill?", a: "Yes. Both Piney Point Village and Bunker Hill Village have high concentrations of custom homes with Sub-Zero and Wolf appliances. We service them regularly." },
    { q: "Do you serve the Tanglewood neighborhood?", a: "Yes — Tanglewood, between the Galleria and Memorial, is within our regular service area. We're in the neighborhood frequently." },
    { q: "Which Spring Branch ZIP codes do you cover?", a: "We serve 77055 (Spring Branch Central), 77080 (Spring Branch West), and 77043 — our own office ZIP near the Energy Corridor." },
    { q: "Can I get same-day repair in the Memorial area?", a: "Yes. The Memorial corridor is one of our most frequently served areas — same-day availability is common Monday through Saturday." },
    { q: "What's the diagnostic fee in the Memorial area?", a: "$120, waived with repair. No mileage surcharge for any Memorial Villages or surrounding neighborhoods — same pricing throughout." },
    { q: "Do you service Hedwig Village and Hilshire Village?", a: "Yes. Both smaller Memorial Villages are within our service area. Same pricing and same-day availability as the larger villages." },
  ],
  nearbyLinks: [
    { label: "Houston", href: "/houston/" },
    { label: "Katy", href: "/katy/" },
    { label: "Bellaire", href: "/bellaire/" },
  ],
};

export default function MemorialPage() {
  return <CityPageClient data={data} />;
}
