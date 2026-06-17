"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

const FacebookIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "Why Us" },
  { href: "#service-areas", label: "Service Areas" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const shouldReduce = useReducedMotion();

  return (
    <footer className="bg-[#0F172A] border-t border-white/10 pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12"
        >
          {/* Brand */}
          <div>
            <p className="text-xl font-semibold text-white mb-3">
              WeRepair<span className="font-black">SubZero</span>.com
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Houston&apos;s trusted Sub-Zero appliance repair specialists.
              Independent Sub-Zero specialists. EPA 608 certified. Fair market pricing.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <FacebookIcon />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-bold text-white mb-4">Quick Links</p>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-bold text-white mb-4">Contact Us</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:3464138813"
                  className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
                >
                  <Phone size={15} className="text-[#1D4ED8] flex-shrink-0" />
                  (346) 413-8813
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@werepairsubzero.com"
                  className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
                >
                  <Mail size={15} className="text-[#1D4ED8] flex-shrink-0" />
                  info@werepairsubzero.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-slate-400 text-sm">
                <MapPin size={15} className="text-[#1D4ED8] flex-shrink-0 mt-0.5" />
                11020 Katy Fwy Suite #117,<br />Houston, TX 77043
              </li>
            </ul>
          </div>
        </motion.div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            © 2026 WeRepairSubZero.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
