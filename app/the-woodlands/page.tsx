import type { Metadata } from "next";
import CityPageClient from "../components/CityPageClient";
import type { CityData } from "../components/CityPageClient";

export const metadata: Metadata = {
  title: "Sub-Zero Repair The Woodlands TX | WeRepairSubZero.com",
  description:
    "Sub-Zero appliance repair in The Woodlands, TX. Serving all villages. EPA 608 certified. Fair market pricing. Call (346) 413-8813.",
  alternates: { canonical: "https://werepairsubzero.com/the-woodlands/" },
};

const data: CityData = {
  city: "The Woodlands",
  h1: "Sub-Zero Repair in The Woodlands, TX",
  intro:
    "The Woodlands master-planned community spans multiple villages including Creekside Park, Carlton Woods, and Panther Creek — areas where Sub-Zero appliances are a standard feature in custom-built homes. Our technicians are familiar with The Woodlands' neighborhoods and provide prompt service throughout Montgomery County.",
  photo: "/IMG_3085.jpeg",
  photoAlt: "Sub-Zero refrigerator repair The Woodlands TX",
  localBusinessSchema: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "WeRepairSubZero - The Woodlands Sub-Zero Repair",
    description: "Independent Sub-Zero repair specialists serving The Woodlands TX — all villages including Carlton Woods, Creekside Park, and Panther Creek.",
    url: "https://werepairsubzero.com/the-woodlands/",
    telephone: "+13464138813",
    address: {
      "@type": "PostalAddress",
      streetAddress: "11020 Katy Fwy Suite #117",
      addressLocality: "Houston",
      addressRegion: "TX",
      postalCode: "77043",
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: 30.1658, longitude: -95.4613 },
    openingHours: "Mo-Sa 08:00-18:00",
    priceRange: "$$",
    areaServed: "The Woodlands, TX",
  },
  breadcrumbSchema: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://werepairsubzero.com/" },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://werepairsubzero.com/#service-areas" },
      { "@type": "ListItem", position: 3, name: "The Woodlands", item: "https://werepairsubzero.com/the-woodlands/" },
    ],
  },
  faqs: [
    { q: "Do you service Carlton Woods in The Woodlands?", a: "Yes — Carlton Woods, Creekside Park, Panther Creek, and all Woodlands villages are within our service area. Carlton Woods in particular has many homes with Sub-Zero and Wolf appliances." },
    { q: "Which Woodlands villages do you cover?", a: "All of them — Grogan's Mill, Panther Creek, Cochran's Crossing, Indian Springs, Sterling Ridge, College Park, and Creekside Park." },
    { q: "Can I get same-day repair in The Woodlands?", a: "Yes. We have technicians who regularly service The Woodlands and can typically accommodate same-day requests Monday through Saturday." },
    { q: "Do you cover the broader Montgomery County area?", a: "Yes — in addition to The Woodlands, we service Conroe, Spring, and other Montgomery County communities within reasonable distance." },
    { q: "What's the diagnostic fee for The Woodlands?", a: "$120, fully waived if the repair proceeds. No travel surcharge for Woodlands locations — same pricing as Houston." },
    { q: "What ZIP codes in The Woodlands do you serve?", a: "We cover 77380, 77381, 77382, 77384, 77385, 77386, 77387, 77388, and 77389 — all Woodlands ZIP codes, plus surrounding Spring/Conroe areas." },
    { q: "Do you repair Sub-Zero in Creekside Park?", a: "Yes. Creekside Park is one of The Woodlands' newer villages with many high-end homes featuring Sub-Zero appliances. We service the area regularly." },
    { q: "Do you service The Woodlands near I-45 and Highway 99?", a: "Yes. We cover The Woodlands from the Town Center to Creekside Park, navigating both I-45 and Grand Parkway corridors to reach all communities." },
  ],
  nearbyLinks: [
    { label: "Houston", href: "/houston/" },
    { label: "Katy", href: "/katy/" },
  ],
};

export default function TheWoodlandsPage() {
  return <CityPageClient data={data} />;
}
