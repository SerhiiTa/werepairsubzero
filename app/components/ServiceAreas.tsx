"use client";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";

const areas = [
  { label: "Houston", href: "/houston/" },
  { label: "Katy", href: "/katy/" },
  { label: "Sugar Land", href: "/sugar-land/" },
  { label: "The Woodlands", href: "/the-woodlands/" },
  { label: "Bellaire", href: "/bellaire/" },
  { label: "Memorial", href: "/memorial/" },
  { label: "River Oaks", href: "/houston/" },
];

export default function ServiceAreas() {
  const shouldReduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const pill = {
    hidden: { opacity: 0, scale: shouldReduce ? 1 : 0.85 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" as const } },
  };

  return (
    <section id="service-areas" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          className="mb-10"
        >
          <p className="text-[#1D4ED8] font-bold tracking-widest text-sm uppercase mb-3">
            SERVICE AREAS
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1E293B]">
            Proudly Serving the Greater Houston Area
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-wrap justify-center gap-3 mb-6"
        >
          {areas.map((area) => (
            <motion.a
              key={area.label}
              href={area.href}
              variants={pill}
              className="flex items-center gap-2 bg-white border border-slate-200 text-[#1E293B] px-5 py-2.5 rounded-full font-semibold shadow-sm text-sm hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-colors"
            >
              <MapPin size={15} className="text-[#1D4ED8]" />
              {area.label}
            </motion.a>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-[#64748B] text-sm"
        >
          and more surrounding communities
        </motion.p>
      </div>
    </section>
  );
}
