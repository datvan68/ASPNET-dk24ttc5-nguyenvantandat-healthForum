"use client";

import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MentalHealthHeroProps {
  title: string;
  description: string;
  breadcrumbs: string[];
  imageUrl: string;
}

export function MentalHealthHero({ title, description, breadcrumbs, imageUrl }: MentalHealthHeroProps) {
  return (
    <section className="pt-16 pb-20">
      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">
        {breadcrumbs.map((crumb, idx) => (
          <span key={crumb} className="flex items-center gap-2">
            <span className={idx === breadcrumbs.length - 1 ? "text-[#1e3a8a]" : ""}>{crumb}</span>
            {idx < breadcrumbs.length - 1 && <span>/</span>}
          </span>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-1/2">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[64px] font-extrabold text-[#191c1e] leading-[1.0] tracking-tight mb-8"
          >
            {title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#424752] leading-relaxed font-medium opacity-80 mb-10"
          >
            {description}
          </motion.p>

          <div className="flex flex-wrap gap-4">
            <Button className="bg-[#0056b3] text-white px-8 py-6 rounded-lg font-bold text-base hover:bg-[#003f87] transition-all flex items-center gap-3">
              Khám phá thảo luận <MoveRight size={20} />
            </Button>
            <Button variant="outline" className="px-8 py-6 rounded-lg font-bold text-base border-slate-200 text-slate-600 hover:bg-slate-50">
              Xem các báo cáo nghiên cứu
            </Button>
          </div>
        </div>

        <div className="lg:w-1/2 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative h-[500px] w-full rounded-[40px] overflow-hidden shadow-2xl"
          >
            <img src={imageUrl} alt="Healthcare Lab" className="w-full h-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-lg inline-flex flex-col gap-1 max-w-[280px]">
                <div className="flex items-center gap-2 text-[10px] font-bold text-green-600 uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Mạng lưới trực tuyến
                </div>
                <div className="text-xl font-extrabold text-slate-800">
                  1,204 Chuyên gia y tế đang hoạt động
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
