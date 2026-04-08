"use client";

import { motion } from "framer-motion";
import { MoveRight, Edit3 } from "lucide-react";

interface NutritionHeroProps {
  title: string;
  description: string;
  breadcrumbs: string[];
}

export function NutritionHero({ title, description, breadcrumbs }: NutritionHeroProps) {
  return (
    <section className="pb-10">
      <div className="flex items-center gap-[40px] text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-[24px]">
        {breadcrumbs.map((crumb, idx) => (
          <span key={crumb} className="flex items-center gap-2">
            <span className={idx === breadcrumbs.length - 1 ? "text-[#1e3a8a]" : ""}>{crumb}</span>
            {idx < breadcrumbs.length - 1 && <span>/</span>}
          </span>
        ))}
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[56px] font-extrabold text-[#191c1e] leading-[1.0] tracking-tight mb-6"
          >
            {title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#424752] leading-relaxed font-medium opacity-80"
          >
            {description}
          </motion.p>
        </div>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-[#0056b3] text-white px-8 py-4 rounded-xl flex items-center gap-3 font-bold shadow-[0_20px_25px_-5px_theme(colors.blue.900/0.1)] hover:bg-[#003f87] transition-all"
        >
          <Edit3 size={20} />
          <span>Bài viết mới</span>
        </motion.button>
      </div>
    </section>
  );
}
