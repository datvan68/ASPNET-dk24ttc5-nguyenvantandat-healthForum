"use client";

import { motion } from "framer-motion";

const partners = [
  "HealthConnect",
  "MediResearch Lab",
  "UniHealth Academy",
  "PharmaBio Inc.",
  "BioTech Alliance"
];

export function TrustPartnersSection() {
  return (
    <section className="container mx-auto px-6 lg:px-32 py-16 border-t border-[#e2e8f0]">
      <div className="text-center space-y-12">
        <h3 className="text-[12px] font-bold uppercase tracking-[2px] text-[#727784] font-[Roboto]">
          Đối tác Chiến lược & Thẩm định Tri thức
        </h3>
        
        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          {partners.map((partner, idx) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="text-2xl font-bold text-[#0f172a] font-manrope whitespace-nowrap"
            >
              {partner}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
