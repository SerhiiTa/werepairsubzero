"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Box, Snowflake, Droplets, Thermometer, Wrench } from "lucide-react";

const services = [
  {
    Icon: Box,
    title: "Refrigerator Repair",
    desc: "Not cooling, water leaks, ice maker issues and more.",
  },
  {
    Icon: Snowflake,
    title: "Freezer Repair",
    desc: "Frost build-up, temperature problems, unusual noises.",
  },
  {
    Icon: Droplets,
    title: "Ice Maker Repair",
    desc: "Not making ice, ice jams, leaks, and more.",
  },
  {
    Icon: Thermometer,
    title: "Temperature Issues",
    desc: "Inconsistent temps, error codes, alarm issues.",
  },
  {
    Icon: Wrench,
    title: "General Maintenance",
    desc: "Keep your Sub-Zero running like new.",
  },
];

export default function Services() {
  const shouldReduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const card = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <section id="services" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          className="text-center mb-14"
        >
          <p className="text-[#1D4ED8] font-bold tracking-widest text-sm uppercase mb-3">
            OUR SERVICES
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1E293B]">
            Sub-Zero Appliance Repair
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
        >
          {services.map(({ Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={card}
              whileHover={
                shouldReduce
                  ? {}
                  : {
                      y: -6,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.10)",
                      transition: { duration: 0.2 },
                    }
              }
              className="bg-white rounded-xl p-6 shadow-sm cursor-default"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <Icon size={24} className="text-[#1D4ED8]" />
              </div>
              <h3 className="font-bold text-[#1E293B] mb-2 text-sm sm:text-base">
                {title}
              </h3>
              <p className="text-[#64748B] text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
