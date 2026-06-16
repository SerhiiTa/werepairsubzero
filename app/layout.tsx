import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BookingModalProvider } from "./components/BookingModal";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "WeRepairSubZero.com — Expert Sub-Zero Repair in Houston",
  description:
    "Factory-trained Sub-Zero repair technicians in Houston. Same-day service, genuine parts, satisfaction guaranteed. Call (713) 300-3892.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-white text-[#1E293B]">
        <BookingModalProvider>{children}</BookingModalProvider>
      </body>
    </html>
  );
}
