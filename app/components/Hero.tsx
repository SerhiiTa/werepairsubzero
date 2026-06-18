"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Phone, CheckCircle } from "lucide-react";
import { useBookingModal } from "./BookingModal";

const badges = ["Certified & Insured", "Same-Day Service", "Genuine Parts"];

export default function Hero() {
  const shouldReduce = useReducedMotion();
  const { openModal } = useBookingModal();

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: shouldReduce ? 0 : 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
  });

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover"
        style={{ backgroundImage: "url('/kitchen.jpg')", backgroundPosition: "center 60%" }}
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 py-24">
        <div className="max-w-3xl">
          <motion.p
            {...anim(0)}
            className="text-[#60a5fa] font-bold tracking-widest text-sm uppercase mb-5"
          >
            EXPERT SUB-ZERO REPAIR IN HOUSTON
          </motion.p>

          <motion.h1
            {...anim(0.1)}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6"
          >
            We Repair Sub-Zero{" "}
            <span className="text-[#3b82f6]">Right.</span> The First Time.
          </motion.h1>

          <motion.p
            {...anim(0.2)}
            className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed"
          >
            Independent specialists. EPA 608 certified. Fair market pricing.
            Houston &amp; surrounding areas.
          </motion.p>

          <motion.div {...anim(0.3)} className="flex flex-wrap gap-4 mb-12">
            <motion.a
              href="tel:3464138813"
              onClick={() => window.gtag?.("event", "phone_click", { event_category: "contact", event_label: "hero" })}
              className="flex items-center gap-2.5 bg-[#1D4ED8] text-white px-6 py-3.5 rounded-lg font-bold text-lg shadow-lg"
              whileHover={shouldReduce ? {} : { scale: 1.03 }}
              whileTap={shouldReduce ? {} : { scale: 0.97 }}
            >
              <Phone size={20} />
              (346) 413-8813
            </motion.a>
            <motion.button
              onClick={() => { openModal(); window.gtag?.("event", "booking_click", { event_category: "booking", event_label: "hero" }); }}
              className="flex items-center gap-2 border-2 border-white/70 text-white px-6 py-3.5 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors"
              whileHover={shouldReduce ? {} : { scale: 1.03 }}
              whileTap={shouldReduce ? {} : { scale: 0.97 }}
            >
              Book Online
            </motion.button>
          </motion.div>

          <motion.div {...anim(0.4)} className="flex flex-wrap gap-3">
            {badges.map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-2 bg-white/10 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/20"
              >
                <CheckCircle size={15} className="text-[#60a5fa]" />
                {badge}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
