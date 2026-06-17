"use client";
import { motion, useReducedMotion } from "framer-motion";
import {
  Phone, Snowflake, Droplets, AlertTriangle,
  Thermometer, Volume2, CloudSnow, CheckCircle,
  ChevronDown, MapPin,
} from "lucide-react";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useBookingModal } from "./BookingModal";

// ── types ─────────────────────────────────────────────────────────────────────

export interface CityFAQ { q: string; a: string; }
export interface NearbyLink { label: string; href: string; }

export interface CityData {
  city: string;
  h1: string;
  intro: string;
  photo: string;
  photoAlt: string;
  photoPosition?: string;
  localBusinessSchema: object;
  breadcrumbSchema: object;
  faqs: CityFAQ[];
  nearbyLinks: NearbyLink[];
}

// ── static data ───────────────────────────────────────────────────────────────

const ISSUES = [
  {
    icon: Snowflake,
    title: "Ice Maker Not Producing Ice",
    desc: "Usually caused by a failed water inlet valve or ice maker module. We diagnose and replace the correct component — no unnecessary part swaps.",
  },
  {
    icon: Droplets,
    title: "Water Leaking Under Refrigerator",
    desc: "A clogged drain line or worn door gasket is the most common cause. We clear blockages and replace gaskets with genuine Sub-Zero parts.",
  },
  {
    icon: AlertTriangle,
    title: "Error Codes EC 50 / EC 40",
    desc: "These codes point to evaporator fan failure or control board faults. Our technicians read Sub-Zero diagnostic data and repair the root cause.",
  },
  {
    icon: Thermometer,
    title: "High Temperature in Both Sections",
    desc: "Dirty condenser coils or a failing compressor cause this. We clean coils on every visit and evaluate compressor health with proper equipment.",
  },
  {
    icon: Volume2,
    title: "Gurgling or Water Noise Behind Unit",
    desc: "Normal refrigerant flow can mimic problems. We distinguish normal operation from defrost cycle issues or refrigerant charge faults.",
  },
  {
    icon: CloudSnow,
    title: "Frost Buildup in Freezer",
    desc: "A failing door gasket or defrost heater lets warm air in. We test both and replace whichever is at fault — backed by our 90-day warranty.",
  },
];

const WHY_US = [
  "EPA 608 certified for refrigerant handling",
  "No corporate markup — fair market pricing",
  "Same-day and next-day appointments",
  "90-day labor warranty, 1 year on parts",
];

// ── sub-components ────────────────────────────────────────────────────────────

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay: (index % 4) * 0.06 }}
      className="border border-slate-200 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-[#1E293B] text-sm sm:text-base">{q}</span>
        <ChevronDown
          size={18}
          className={`text-[#1D4ED8] flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-4">
          {a}
        </div>
      )}
    </motion.div>
  );
}

// ── main component ────────────────────────────────────────────────────────────

export default function CityPageClient({ data }: { data: CityData }) {
  const { openModal } = useBookingModal();
  const shouldReduce = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: shouldReduce ? 0 : 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.5, ease: "easeOut" as const, delay },
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data.localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data.breadcrumbSchema) }} />

      <Header />
      <main>
        {/* Hero */}
        <section className="relative min-h-[55vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-cover" style={{ backgroundImage: `url('${data.photo}')`, backgroundPosition: data.photoPosition ?? "center" }} />
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 py-20">
            <motion.p {...fadeUp(0)} className="text-[#60a5fa] font-bold tracking-widest text-xs uppercase mb-4">
              SUB-ZERO REPAIR · HOUSTON METRO
            </motion.p>
            <motion.h1 {...fadeUp(0.08)} className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6 max-w-3xl">
              {data.h1}
            </motion.h1>
            <motion.div {...fadeUp(0.16)} className="flex flex-wrap gap-4">
              <motion.a
                href="tel:3464138813"
                className="flex items-center gap-2.5 bg-[#1D4ED8] text-white px-6 py-3.5 rounded-lg font-bold text-lg shadow-lg"
                whileHover={shouldReduce ? {} : { scale: 1.03 }}
                whileTap={shouldReduce ? {} : { scale: 0.97 }}
              >
                <Phone size={20} /> (346) 413-8813
              </motion.a>
              <motion.button
                onClick={openModal}
                className="flex items-center gap-2 border-2 border-white/70 text-white px-6 py-3.5 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors"
                whileHover={shouldReduce ? {} : { scale: 1.03 }}
                whileTap={shouldReduce ? {} : { scale: 0.97 }}
              >
                Book Online
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Intro + breadcrumb */}
        <section className="py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-[860px] mx-auto">
            <motion.nav {...fadeUp(0)} className="text-sm text-slate-500 mb-8">
              <a href="/" className="hover:text-[#1D4ED8] transition-colors">Home</a>
              <span className="mx-2">›</span>
              <a href="/#service-areas" className="hover:text-[#1D4ED8] transition-colors">Service Areas</a>
              <span className="mx-2">›</span>
              <span className="text-[#1E293B] font-medium">{data.city}</span>
            </motion.nav>
            <motion.p {...fadeUp(0.05)} className="text-lg sm:text-xl text-slate-700 leading-relaxed">
              {data.intro}
            </motion.p>
          </div>
        </section>

        {/* Common Issues */}
        <section className="py-20 px-4 sm:px-6 bg-slate-50">
          <div className="max-w-[1200px] mx-auto">
            <motion.div {...fadeUp(0)} className="text-center mb-12">
              <p className="text-[#1D4ED8] font-bold tracking-widest text-xs uppercase mb-3">DIAGNOSTICS</p>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1E293B]">
                Common Sub-Zero Issues We Fix in {data.city}
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ISSUES.map((issue, i) => {
                const Icon = issue.icon;
                return (
                  <motion.div key={i} {...fadeUp(i * 0.07)} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                    <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] flex items-center justify-center mb-4">
                      <Icon size={20} className="text-[#1D4ED8]" />
                    </div>
                    <h3 className="font-bold text-[#1E293B] mb-2">{issue.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{issue.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 px-4 sm:px-6 bg-[#0F172A]">
          <div className="max-w-[860px] mx-auto">
            <motion.h2 {...fadeUp(0)} className="text-2xl sm:text-3xl font-black text-white text-center mb-10">
              Why Choose WeRepairSubZero in {data.city}?
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WHY_US.map((item, i) => (
                <motion.div key={i} {...fadeUp(i * 0.08)} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-4">
                  <CheckCircle size={18} className="text-[#60a5fa] flex-shrink-0" />
                  <span className="text-slate-200 text-sm sm:text-base">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-[860px] mx-auto">
            <motion.div {...fadeUp(0)} className="text-center mb-12">
              <p className="text-[#1D4ED8] font-bold tracking-widest text-xs uppercase mb-3">FAQ</p>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1E293B]">
                Sub-Zero Repair in {data.city} — Common Questions
              </h2>
            </motion.div>
            <div className="space-y-3">
              {data.faqs.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} index={i} />)}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 bg-[#0F172A]">
          <div className="max-w-[860px] mx-auto text-center">
            <motion.h2 {...fadeUp(0)} className="text-2xl sm:text-3xl font-black text-white mb-4">
              Schedule Sub-Zero Repair in {data.city}
            </motion.h2>
            <motion.p {...fadeUp(0.08)} className="text-slate-400 mb-10">
              Same-day appointments Mon–Sat. $120 diagnostic — waived with repair.
            </motion.p>
            <motion.div {...fadeUp(0.14)} className="flex flex-wrap gap-4 justify-center">
              <motion.button
                onClick={openModal}
                className="bg-[#1D4ED8] text-white px-8 py-4 rounded-lg font-bold text-base hover:bg-[#1e40af] transition-colors"
                whileHover={shouldReduce ? {} : { scale: 1.03 }}
                whileTap={shouldReduce ? {} : { scale: 0.97 }}
              >
                Book Online
              </motion.button>
              <motion.a
                href="tel:3464138813"
                className="flex items-center gap-2.5 border-2 border-white/40 text-white px-8 py-4 rounded-lg font-bold text-base hover:bg-white/10 transition-colors"
                whileHover={shouldReduce ? {} : { scale: 1.03 }}
                whileTap={shouldReduce ? {} : { scale: 0.97 }}
              >
                <Phone size={18} /> (346) 413-8813
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Also Serving */}
        <section className="py-12 px-4 sm:px-6 bg-slate-50">
          <div className="max-w-[860px] mx-auto text-center">
            <motion.div {...fadeUp(0)}>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-5">
                Also Serving Nearby Areas
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {data.nearbyLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 bg-white border border-slate-200 text-[#1E293B] px-4 py-2 rounded-full text-sm font-semibold hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-colors shadow-sm"
                  >
                    <MapPin size={13} className="text-[#1D4ED8]" />
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
