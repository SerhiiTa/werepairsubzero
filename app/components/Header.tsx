"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "Why Us" },
  { href: "#service-areas", label: "Service Areas" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <a href="#home" className="shrink-0">
          <img src="/logo.png" alt="WeRepairSubZero" style={{ height: "50px", width: "auto", maxWidth: "200px" }} />
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#1E293B]">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-[#1D4ED8] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <motion.a
            href="tel:3464138813"
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
              <a
                href="tel:3464138813"
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
