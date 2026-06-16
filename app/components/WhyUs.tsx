"use client";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const checkmarks = [
  "Specialists in Sub-Zero only",
  "Over 10 years of local experience",
  "Upfront pricing, no hidden fees",
  "Satisfaction guaranteed",
];

export default function WhyUs() {
  const shouldReduce = useReducedMotion();

  return (
    <section id="why-us" className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
          >
            <p className="text-[#1D4ED8] font-bold tracking-widest text-sm uppercase mb-3">
              WHY CHOOSE US
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1E293B] mb-6">
              Houston&apos;s Sub-Zero Repair Experts
            </h2>
            <p className="text-[#64748B] mb-8 leading-relaxed text-lg">
              When your Sub-Zero appliance needs repair, you need a technician
              who knows these machines inside and out. We specialize exclusively
              in Sub-Zero, so you get the highest level of expertise for your
              investment.
            </p>

            <ul className="space-y-4 mb-10">
              {checkmarks.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: shouldReduce ? 0 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut" as const,
                    delay: i * 0.1,
                  }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle
                    size={20}
                    className="text-[#1D4ED8] flex-shrink-0"
                  />
                  <span className="font-semibold text-[#1E293B]">{item}</span>
                </motion.li>
              ))}
            </ul>

            <motion.a
              href="#about"
              className="inline-flex items-center gap-2 bg-[#1D4ED8] text-white px-6 py-3 rounded-lg font-bold"
              whileHover={shouldReduce ? {} : { scale: 1.03 }}
              whileTap={shouldReduce ? {} : { scale: 0.97 }}
            >
              Learn More About Us
            </motion.a>
          </motion.div>

          {/* Right – photo */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.15 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]"
          >
            <img
              src="/kitchen-whyus.jpg"
              alt="Luxury kitchen"
              className="w-full h-full object-cover rounded-2xl"
              style={{ objectPosition: "left center" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
