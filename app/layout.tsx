import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { BookingModalProvider } from "./components/BookingModal";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "We Repair Only Sub-Zero | Houston Sub-Zero Repair Specialists",
  description:
    "Factory-trained Sub-Zero repair technicians in Houston. Same-day service, genuine parts, satisfaction guaranteed. Call (346) 413-8813.",
  verification: {
    google: "rurQDPK0kn9jRAUggXMijR8O8xmNrruPeIUrBICA3Qw",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "WeRepairSubZero",
  description:
    "Sub-Zero exclusive repair specialists in Houston. 20+ years experience in industrial electronics and refrigeration systems.",
  url: "https://werepairsubzero.com",
  telephone: "+13464138813",
  address: {
    "@type": "PostalAddress",
    streetAddress: "11020 Katy Fwy Suite #117",
    addressLocality: "Houston",
    addressRegion: "TX",
    postalCode: "77043",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 29.7828,
    longitude: -95.5765,
  },
  openingHours: "Mo-Sa 08:00-18:00",
  priceRange: "$$",
  areaServed: [
    "Houston", "Katy", "Sugar Land", "The Woodlands",
    "Spring", "Cypress", "Pearland", "Bellaire",
    "River Oaks", "Memorial",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-YSLTHX24RJ"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-YSLTHX24RJ');
        `}
      </Script>
      <body className="font-sans antialiased bg-white text-[#1E293B]">
        <BookingModalProvider>{children}</BookingModalProvider>
      </body>
    </html>
  );
}
