import type { Metadata } from "next";
import CityPageClient from "../components/CityPageClient";
import type { CityData } from "../components/CityPageClient";

export const metadata: Metadata = {
  title: "Sub-Zero Repair Bellaire TX | WeRepairSubZero.com",
  description:
    "Sub-Zero repair in Bellaire, TX. Local independent specialists. No corporate markup. Serving ZIP 77401. Call (346) 413-8813.",
  alternates: { canonical: "https://werepairsubzero.com/bellaire/" },
};

const data: CityData = {
  city: "Bellaire",
  h1: "Sub-Zero Repair in Bellaire, TX",
  intro:
    "Bellaire — the \"City of Homes\" — is one of Houston's most sought-after residential enclaves, with custom homes frequently equipped with Sub-Zero refrigeration systems. Located minutes from the Texas Medical Center and the Galleria, Bellaire homeowners expect fast, expert service. We deliver.",
  photo: "/IMG_3558.jpeg",
  photoAlt: "Sub-Zero refrigerator repair Bellaire TX",
  localBusinessSchema: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "WeRepairSubZero - Bellaire Sub-Zero Repair",
    description: "Independent Sub-Zero repair specialists serving Bellaire TX (ZIP 77401). No corporate markup. EPA 608 certified.",
    url: "https://werepairsubzero.com/bellaire/",
    telephone: "+13464138813",
    address: {
      "@type": "PostalAddress",
      streetAddress: "11020 Katy Fwy Suite #117",
      addressLocality: "Houston",
      addressRegion: "TX",
      postalCode: "77043",
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: 29.7058, longitude: -95.4586 },
    openingHours: "Mo-Sa 08:00-18:00",
    priceRange: "$$",
    areaServed: "Bellaire, TX",
  },
  breadcrumbSchema: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://werepairsubzero.com/" },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://werepairsubzero.com/#service-areas" },
      { "@type": "ListItem", position: 3, name: "Bellaire", item: "https://werepairsubzero.com/bellaire/" },
    ],
  },
  faqs: [
    { q: "Do you specifically serve Bellaire (ZIP 77401)?", a: "Yes — Bellaire ZIP 77401 is within our priority service zone. We're in Bellaire frequently and can usually schedule same-day or next-morning appointments." },
    { q: "Is Bellaire a separate city from Houston?", a: "Yes. Bellaire is an independent city entirely surrounded by Houston. It has its own municipal services, and we treat it as a dedicated service zone — not a Houston suburb." },
    { q: "Can I get same-day Sub-Zero repair in Bellaire?", a: "Yes. Bellaire's central location near the Galleria and West University puts it in a high-priority zone for our technicians. Same-day availability is common." },
    { q: "Do you serve the area near the Texas Medical Center?", a: "Yes. Homes in the Medical Center area, South Main, and surrounding neighborhoods are within our regular Bellaire/Houston service area." },
    { q: "What's the diagnostic fee in Bellaire?", a: "$120, waived if repair proceeds. No extra charge for Bellaire vs Houston proper — same fair pricing throughout our service area." },
    { q: "What Sub-Zero models do you see most often in Bellaire?", a: "Bellaire's custom homes typically feature built-in Sub-Zero models — Classic 36\", PRO 48\", and Designer columns. We service all of them." },
    { q: "How quickly can a technician reach Bellaire?", a: "Very quickly — Bellaire's central location means our technicians can usually arrive within 2–3 hours of booking, often the same morning you call." },
    { q: "Do you also service West University Place near Bellaire?", a: "Yes. West University Place is directly adjacent to Bellaire, and we service it under the same terms and pricing. It's within our regular route." },
  ],
  nearbyLinks: [
    { label: "Houston", href: "/houston/" },
    { label: "Memorial", href: "/memorial/" },
    { label: "Sugar Land", href: "/sugar-land/" },
  ],
};

export default function BellairePage() {
  return <CityPageClient data={data} />;
}
