"use client";

import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MentalHealthHeroProps {
  titleMain: string;
  titleHighlight: string;
  description: string;
  imageUrl: string;
}

export function MentalHealthHero({ titleMain, titleHighlight, description, imageUrl }: MentalHealthHeroProps) {
  return (
    <section className="pt-6 pb-20">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-7/12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-[64px] font-extrabold leading-[1.1] tracking-[-1.8px] font-manrope">
              <span className="text-[#003f87] block">{titleMain}</span>
              <span className="text-[#006e25] block">{titleHighlight}</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[20px] text-[#424752] leading-[32.5px] font-medium opacity-90 mb-10 max-w-2xl"
          >
            {description}
          </motion.p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button className="bg-gradient-to-r from-[#003f87] to-[#0056b3] text-white px-8 py-7 rounded-lg font-bold text-base hover:shadow-lg hover:shadow-blue-500/20 transition-all flex items-center gap-3">
              Khám phá thảo luận <MoveRight size={20} />
            </Button>
            <Button variant="outline" className="px-8 py-7 rounded-lg font-bold text-base border-slate-200 text-[#003f87] hover:bg-slate-50">
              Xem các báo cáo nghiên cứu
            </Button>
          </div>
        </div>

        <div className="lg:w-5/12 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative h-[480px] w-full rounded-[32px] overflow-hidden shadow-2xl"
          >
            <img src={imageUrl} alt="Mental Health Insight" className="w-full h-full object-cover" />
            
            {/* Floating Info Card */}
            <div className="absolute bottom-6 left-[-24px] z-20">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="backdrop-blur-md bg-white/90 p-6 rounded-2xl border border-[#c2c6d4]/15 shadow-2xl max-w-[240px] space-y-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#006e25] shadow-sm animate-pulse" />
                  <span className="text-[12px] font-bold text-[#006e25] uppercase tracking-[1.2px] leading-tight">
                    Mạng lưới trực <br /> tuyến
                  </span>
                </div>
                <div className="text-[18px] font-extrabold text-[#191c1e] leading-tight">
                  1,204 Chuyên gia y tế đang hoạt động
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

