"use client";

import React from "react";
import { TrendingUp, Users, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface Expert {
  name: string;
  role: string;
  avatar: string;
  status: "online" | "offline";
}

interface TrendingItem {
  id: number;
  title: string;
  stats: string;
}

interface FitnessSidebarProps {
  trending: TrendingItem[];
  experts: Expert[];
}

export function FitnessSidebar({ trending, experts }: FitnessSidebarProps) {
  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Trending Section */}
      <div className="bg-[#f2f4f6] rounded-xl p-6 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <TrendingUp size={20} className="text-[#191c1e]" />
          <h4 className="font-bold text-[#191c1e] text-[18px]">Chủ đề hot tuần này</h4>
        </div>

        <div className="flex flex-col gap-6">
          {trending.map((item, i) => (
            <div key={item.id} className="flex flex-col gap-1 cursor-pointer group">
              <span className="text-[10px] font-bold text-[#424752] uppercase tracking-tighter">
                #{i + 1} Xu hướng
              </span>
              <h5 className="font-semibold text-sm text-[#191c1e] group-hover:text-[#003f87] transition-colors">
                {item.title}
              </h5>
              <p className="text-[12px] text-[#424752] opacity-80">
                {item.stats}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Online Experts Section */}
      <div className="bg-white border border-[rgba(194,198,212,0.1)] rounded-xl p-6 flex flex-col gap-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Users size={22} className="text-[#191c1e]" />
          <h4 className="font-bold text-[#191c1e] text-[18px] leading-tight">
            Chuyên gia đang online
          </h4>
        </div>

        <div className="flex flex-col gap-4">
          {experts.map((expert, i) => (
            <div key={i} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-100">
                    <img src={expert.avatar} alt={expert.name} className="w-full h-full object-cover" />
                  </div>
                  <div className={cn(
                    "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white",
                    expert.status === "online" ? "bg-[#006e25]" : "bg-[#cbd5e1]"
                  )} title={expert.status} />
                </div>
                <div>
                  <h5 className="font-semibold text-sm text-[#191c1e] leading-tight">{expert.name}</h5>
                  <p className="text-[10px] text-[#424752] font-medium">{expert.role}</p>
                </div>
              </div>
              <button className={cn(
                "text-[12px] font-bold px-3 py-1 rounded-lg transition-colors",
                expert.status === "online" ? "text-[#003f87] hover:bg-[#003f87]/5" : "text-[#94a3b8]"
              )}>
                {expert.status === "online" ? "Hỏi ngay" : "Offline"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="bg-[#0056b3] rounded-xl p-8 flex flex-col gap-4 relative overflow-hidden group">
        <div className="absolute top-[-64px] right-[-64px] w-32 h-32 bg-white/10 blur-[32px] rounded-2xl" />
        
        <div className="flex flex-col gap-2 relative z-10">
          <h4 className="font-bold text-white text-[20px] leading-tight flex flex-col">
            <span>Nhận bí quyết tập</span>
            <span>luyện</span>
          </h4>
          <p className="text-[#dbeafe] text-sm leading-relaxed">
            Đăng ký để nhận giáo án tập luyện từ chuyên gia hàng tuần.
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-2 relative z-10">
          <input 
            type="email" 
            placeholder="Email của bạn..."
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-white/50 focus:outline-none focus:border-white/40"
          />
          <button className="w-full bg-white text-[#003f87] font-bold py-2.5 rounded-lg text-sm shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
            Tham gia ngay
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
