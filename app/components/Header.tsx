"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, ChevronDown, MapPin } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "Why Us" },
  { href: "#contact", label: "Contact" },
];

const serviceAreaLinks = [
  { href: "/houston/", label: "Houston" },
  { href: "/katy/", label: "Katy" },
  { href: "/sugar-land/", label: "Sugar Land" },
  { href: "/the-woodlands/", label: "The Woodlands" },
  { href: "/bellaire/", label: "Bellaire" },
  { href: "/memorial/", label: "Memorial" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <a href="/" className="shrink-0">
          <img src="/logo.png" alt="WeRepairSubZero" className="h-16 md:h-36 w-auto" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#1E293B]">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-[#1D4ED8] transition-colors">
              {l.label}
            </a>
          ))}

          {/* Service Areas dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setAreasOpen(true)}
            onMouseLeave={() => setAreasOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-[#1D4ED8] transition-colors">
              Service Areas
              <ChevronDown size={13} className={`transition-transform duration-200 ${areasOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {areasOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-slate-100 py-2 min-w-[180px] z-50"
                >
                  {serviceAreaLinks.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-[#1E293B] hover:text-[#1D4ED8] hover:bg-slate-50 transition-colors"
                    >
                      <MapPin size={12} className="text-[#1D4ED8]" />
                      {l.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <motion.a
            href="tel:3464138813"
            onClick={() => window.gtag?.("event", "phone_click", { event_category: "contact", event_label: "header" })}
            className="hidden sm:flex items-center gap-2 bg-[#1D4ED8] text-white px-4 py-2 rounded-lg text-sm font-bold shrink-0"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Phone size={15} />
            (346) 413-8813
          </motion.a>

          <button
            className="md:hidden p-2 text-[#1E293B]"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-slate-100 bg-white overflow-hidden"
          >
            <nav className="flex flex-col px-4 py-4 gap-4 text-sm font-medium">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-[#1E293B] hover:text-[#1D4ED8] transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              ))}

              {/* Mobile Service Areas toggle */}
              <div>
                <button
                  onClick={() => setAreasOpen(!areasOpen)}
                  className="flex items-center gap-1 text-[#1E293B] hover:text-[#1D4ED8] transition-colors w-full"
                >
                  Service Areas
                  <ChevronDown size={13} className={`transition-transform duration-200 ml-1 ${areasOpen ? "rotate-180" : ""}`} />
                </button>
                {areasOpen && (
                  <div className="mt-2 ml-2 flex flex-col gap-2">
                    {serviceAreaLinks.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        className="flex items-center gap-2 text-slate-600 hover:text-[#1D4ED8] transition-colors"
                        onClick={() => setOpen(false)}
                      >
                        <MapPin size={12} className="text-[#1D4ED8]" />
                        {l.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a
                href="tel:3464138813"
                onClick={() => window.gtag?.("event", "phone_click", { event_category: "contact", event_label: "header" })}
                className="flex items-center gap-2 bg-[#1D4ED8] text-white px-4 py-2.5 rounded-lg font-bold w-fit"
              >
                <Phone size={15} />
                (346) 413-8813
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
