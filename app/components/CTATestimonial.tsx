"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Phone, Star } from "lucide-react";

export default function CTATestimonial() {
  const shouldReduce = useReducedMotion();

  return (
    <section id="contact" className="py-20 bg-[#0F172A]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-8">
              Get Fast, Reliable Service Today
            </h2>

            <a
              href="tel:3464138813"
              className="flex items-center gap-3 text-white mb-8 group w-fit"
            >
              <Phone size={28} className="text-[#1D4ED8]" />
              <span className="text-3xl font-black group-hover:text-[#60a5fa] transition-colors">
                (346) 413-8813
              </span>
            </a>

            <motion.a
              href="#book"
              className="inline-flex items-center gap-2 bg-[#1D4ED8] text-white px-8 py-4 rounded-lg font-bold text-lg mb-8"
              whileHover={shouldReduce ? {} : { scale: 1.03 }}
              whileTap={shouldReduce ? {} : { scale: 0.97 }}
            >
              Book Online Now
            </motion.a>

            <p className="text-slate-400 text-sm font-medium">
              Mon – Sat: 7:00 AM – 7:00 PM
            </p>
          </motion.div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.15 }}
            className="bg-white rounded-2xl p-8 shadow-2xl"
          >
            <p className="text-[#1D4ED8] font-bold tracking-widest text-xs uppercase mb-4">
              WHAT OUR CUSTOMERS SAY
            </p>

            <div className="flex gap-1 mb-5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className="text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>

            <blockquote className="text-[#1E293B] text-base sm:text-lg leading-relaxed mb-6 italic">
              &ldquo;I called WeRepairSubZero on a Monday morning when my fridge
              stopped cooling. They sent a technician the same day, diagnosed
              the issue immediately, and had it fixed within two hours.
              Professional, fast, and fair pricing. Highly recommend!&rdquo;
            </blockquote>

            <p className="font-bold text-[#1E293B]">
              — Michael R., Houston, TX
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
