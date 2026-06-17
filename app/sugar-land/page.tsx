import type { Metadata } from "next";
import CityPageClient from "../components/CityPageClient";
import type { CityData } from "../components/CityPageClient";

export const metadata: Metadata = {
  title: "Sub-Zero Repair Sugar Land TX | WeRepairSubZero.com",
  description:
    "Sub-Zero repair in Sugar Land, TX. Serving First Colony, Telfair, New Territory. Independent EPA 608 certified specialists. Call (346) 413-8813.",
  alternates: { canonical: "https://werepairsubzero.com/sugar-land/" },
};

const data: CityData = {
  city: "Sugar Land",
  h1: "Sub-Zero Repair in Sugar Land, TX",
  intro:
    "Sugar Land's upscale communities — First Colony, Telfair, Riverstone, and New Territory — are known for high-end kitchen appliances including Sub-Zero refrigerators and freezers. We provide expert repair service throughout Sugar Land and the Fort Bend County area.",
  photo: "/IMG_2886.jpeg",
  photoAlt: "Sub-Zero refrigerator repair Sugar Land TX",
  localBusinessSchema: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "WeRepairSubZero - Sugar Land Sub-Zero Repair",
    description: "Independent Sub-Zero repair specialists serving Sugar Land TX — First Colony, Telfair, Riverstone, New Territory, and Fort Bend County.",
    url: "https://werepairsubzero.com/sugar-land/",
    telephone: "+13464138813",
    address: {
      "@type": "PostalAddress",
      streetAddress: "11020 Katy Fwy Suite #117",
      addressLocality: "Houston",
      addressRegion: "TX",
      postalCode: "77043",
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: 29.6196, longitude: -95.6349 },
    openingHours: "Mo-Sa 08:00-18:00",
    priceRange: "$$",
    areaServed: "Sugar Land, TX",
  },
  breadcrumbSchema: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://werepairsubzero.com/" },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://werepairsubzero.com/#service-areas" },
      { "@type": "ListItem", position: 3, name: "Sugar Land", item: "https://werepairsubzero.com/sugar-land/" },
    ],
  },
  faqs: [
    { q: "Do you serve First Colony in Sugar Land?", a: "Yes — First Colony, Telfair, Riverstone, and New Territory are all within our Sugar Land service area. We're in these communities regularly." },
    { q: "Which Sugar Land ZIP codes do you cover?", a: "We serve 77478 and 77479 (Sugar Land proper), as well as surrounding Fort Bend County communities including Missouri City and Stafford." },
    { q: "Do you service Telfair and Riverstone?", a: "Yes. Both Telfair and Riverstone have high concentrations of Sub-Zero appliances in custom and semi-custom homes. Our technicians service them regularly." },
    { q: "Can I get same-day repair in Sugar Land?", a: "Usually yes — we serve Sugar Land Monday through Saturday with same-day availability most days. Call early in the morning for the best chance." },
    { q: "What's the diagnostic fee for Sugar Land customers?", a: "$120, waived if repair is performed. No surcharge for Fort Bend County locations — same pricing as Houston proper." },
    { q: "Do you cover the broader Fort Bend County area?", a: "Yes. In addition to Sugar Land, we service Missouri City, Stafford, Sienna Plantation, and other Fort Bend County communities." },
    { q: "What Sub-Zero models are most common in Sugar Land?", a: "We see a lot of Sub-Zero PRO 48 and Classic 36 built-ins in Sugar Land's custom homes, along with undercounter wine units and integrated columns." },
    { q: "Do you serve New Territory in Sugar Land?", a: "Yes. New Territory is part of our regular Sugar Land service area. Same pricing, same same-day availability as First Colony or Telfair." },
  ],
  nearbyLinks: [
    { label: "Houston", href: "/houston/" },
    { label: "Katy", href: "/katy/" },
    { label: "Bellaire", href: "/bellaire/" },
  ],
};

export default function SugarLandPage() {
  return <CityPageClient data={data} />;
}
