"use client";

import React from "react";
import { User, Calendar, Eye, ShieldCheck, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResearchSidebarProps {
  author: {
    name: string;
    role: string;
    bio: string;
    avatar: string;
  };
  lastUpdated: string;
  views: string;
  category: string;
}

export function ResearchSidebar({ author, lastUpdated, views, category }: ResearchSidebarProps) {
  return (
    <div className="w-full flex flex-col gap-8">
      {/* Author Card */}
      <div className="bg-[#f2f4f6] rounded-xl p-6 flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-white shadow-sm">
            <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-bold text-[#003f87] text-base leading-tight">{author.name}</h4>
            <span className="text-[10px] font-medium text-[#727784] uppercase tracking-wider">
              {author.role}
            </span>
          </div>
        </div>
        
        <p className="text-sm text-[#424752] leading-relaxed">
          {author.bio}
        </p>

        <button className="w-full py-2.5 px-4 rounded-lg border border-[#727784]/15 text-[#003f87] text-sm font-medium hover:bg-white/50 transition-colors flex items-center justify-center gap-2 group">
          Xem hồ sơ
          <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Discussion Stats */}
      <div className="flex flex-col gap-4 px-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#424752] text-sm">
            <Calendar size={16} className="opacity-60" />
            <span>Cập nhật lần cuối</span>
          </div>
          <span className="text-[#191c1e] text-sm font-medium">{lastUpdated}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#424752] text-sm">
            <Eye size={16} className="opacity-60" />
            <span>Lượt xem</span>
          </div>
          <span className="text-[#191c1e] text-sm font-medium">{views}</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-[#424752] text-sm">
            <ShieldCheck size={16} className="opacity-60" />
            <span>Danh mục</span>
          </div>
          <div className="bg-[#80f98b] px-3 py-1 rounded-full">
            <span className="text-[#007327] text-[10px] font-bold uppercase tracking-wide">
              {category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
