"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

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
    <aside className="space-y-12">
      <div className="bg-[#f2f4f6] p-10 rounded-[32px] border border-slate-100">
        <div className="flex items-center gap-3 mb-10 text-[#1e3a8a]">
          <TrendingUp size={24} />
          <h3 className="text-sm font-bold uppercase tracking-widest leading-none">Đang là xu hướng</h3>
        </div>

        <div className="space-y-10">
          {trending.map((item, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="text-[10px] font-bold text-[#1e3a8a] uppercase tracking-widest mb-3 opacity-60">
                {item.category}
              </div>
              <h4 className="text-base font-bold text-slate-800 leading-snug group-hover:text-[#0056b3] transition-colors mb-3">
                {item.title}
              </h4>
              <div className="text-xs font-bold text-slate-400">
                {item.membersCount} members discussing
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#1e3a8a] p-10 rounded-[32px] text-white">
        <h3 className="text-2xl font-extrabold leading-tight mb-4">
          {cta.title}
        </h3>
        <p className="text-sm font-medium text-white/70 leading-relaxed mb-8">
          {cta.description}
        </p>
        <button className="w-full bg-white text-[#1e3a8a] py-4 rounded-xl font-bold text-sm shadow-xl hover:bg-slate-50 transition-all">
          {cta.buttonLabel}
        </button>
      </div>
    </aside>
  );
}
