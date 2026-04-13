"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Award, Beaker, UserCheck, ShieldCheck, Microscope } from "lucide-react";

import { useIsMounted } from "@/hooks/useIsMounted";

interface Badge {
  id: number;
  name: string;
  iconUrl: string | null;
  isEarned: boolean;
}

interface StatsGridProps {
  healthScore: number;
  badges: Badge[];
}

export function StatsGrid({ healthScore, badges }: StatsGridProps) {
  const isMounted = useIsMounted();
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.section 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="flex gap-[24px] items-start w-full max-w-[1228px] mx-auto px-8 mb-12"
    >
      {/* Health Score Card */}
      <motion.div 
        variants={item}
        className="bg-[#f2f4f6] p-[24px] rounded-[8px] flex flex-col justify-between h-[180px] w-[275px] shrink-0"
      >
        <div className="flex flex-col gap-[4px] items-start">
          <span className="text-[10px] font-semibold uppercase tracking-[1px] text-[#727784] mb-1 block">
            Tổng điểm sức khỏe
          </span>
          <h3 className="text-[36px] font-['Manrope',sans-serif] font-extrabold text-[#003f87] leading-[40px]">
            {isMounted ? healthScore.toLocaleString('en-US') : healthScore}
          </h3>
        </div>
        <div className="bg-[rgba(0,63,135,0.05)] p-[12px] rounded-[4px]">
          <p className="text-[12px] text-[#424752] leading-[19.5px]">
            Top 5% người đóng góp trong tháng này
          </p>
        </div>
      </motion.div>

      {/* Badges Card */}
      <motion.div 
        variants={item}
        className="flex-1 bg-[#f2f4f6] pb-[36px] pt-[24px] px-[24px] rounded-[8px]"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[1px] text-[#727784] mb-6 block">
          Huy hiệu chuyên môn
        </span>
        <div className="flex gap-[16px] items-start">
          {badges.map((badge) => (
            <motion.div 
              key={badge.id}
              whileHover={badge.isEarned ? { scale: 1.05 } : {}}
              className={`flex flex-col items-center gap-[8px] transition-opacity ${!badge.isEarned ? 'opacity-40' : ''}`}
            >
              <div className={`size-[64px] bg-white rounded-[12px] border border-[rgba(194,198,212,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex items-center justify-center p-px relative ${!badge.isEarned ? 'border-dashed' : 'border-solid'}`}>
                {badge.iconUrl ? (
                  <div className="size-[32px] relative">
                    <Image
                      src={badge.iconUrl}
                      alt={badge.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="text-[#c2c6d4]">
                    {badge.isEarned ? <Award size={24} /> : <div className="text-[#c2c6d4]/50">🔒</div>}
                  </div>
                )}
              </div>
              <span className="text-[10px] font-medium text-[#191c1e] text-center w-[80px] leading-[15px]">
                {badge.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
