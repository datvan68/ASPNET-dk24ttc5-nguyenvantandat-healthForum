"use client";

import { motion } from "framer-motion";

interface TrendingItem {
  category: string;
  title: string;
  membersCount: string;
}

interface SidebarCTA {
  title: string;
  description: string;
  buttonLabel: string;
}

interface MentalHealthSidebarProps {
  trending: TrendingItem[];
  cta: SidebarCTA;
}

export function MentalHealthSidebar({ trending, cta }: MentalHealthSidebarProps) {
  return (
    <aside className="space-y-10">
      {/* Trending Widget */}
      <div className="bg-[#eceef0] p-8 rounded-[32px] space-y-6">
        <div className="flex items-center gap-2 text-[#191c1e]">
          <img src="/assets/icon-trending-sidebar.svg" alt="Trending" className="w-5 h-3" />
          <h3 className="text-[18px] font-bold font-manrope">Đang là xu hướng</h3>
        </div>

        <div className="space-y-0">
          {trending.map((item, idx) => (
            <div 
              key={idx} 
              className={`py-6 first:pt-0 last:pb-0 ${idx !== 0 ? "border-t border-[rgba(194,198,212,0.1)]" : ""}`}
            >
              <div className="text-[12px] font-semibold text-[#003f87] uppercase tracking-[1.2px] mb-1">
                {item.category}
              </div>
              <h4 className="text-[16px] font-semibold text-[#191c1e] leading-tight hover:text-[#003f87] transition-colors mb-1">
                {item.title}
              </h4>
              <div className="text-[12px] text-[#424752]">
                {item.membersCount} members discussing
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Card */}
      <div className="relative rounded-[32px] overflow-hidden h-[320px] group">
        <img 
          src="/assets/sidebar-cta-bg.png" 
          alt="CTA Background" 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#003f87]/90 to-transparent p-8 flex flex-col justify-end">
          <h3 className="text-[20px] font-bold text-white mb-2 font-manrope">
            {cta.title}
          </h3>
          <p className="text-[14px] text-blue-100/80 mb-4 leading-relaxed">
            {cta.description}
          </p>
          <button className="w-full bg-white text-[#003f87] py-3 rounded-lg font-semibold text-[14px] hover:bg-slate-50 transition-all shadow-lg">
            {cta.buttonLabel}
          </button>
        </div>
      </div>
    </aside>
  );
}

