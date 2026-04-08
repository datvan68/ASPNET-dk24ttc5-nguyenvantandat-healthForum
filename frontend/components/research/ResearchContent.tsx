"use client";

import React from "react";
import { Quote, CheckCircle2, Heart, MessageSquare, Share2, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResearchContentProps {
  title: string;
  participants: string[];
  featuredImage: string;
  content: {
    quote: string;
    intro: string;
    methodology: {
      title: string;
      description: string;
      points: string[];
      conclusion: string;
    };
  };
  stats: {
    likes: number;
    comments: number;
  };
}

export function ResearchContent({ title, participants, featuredImage, content, stats }: ResearchContentProps) {
  return (
    <div className="w-full flex flex-col gap-10">
      {/* Article Header */}
      <div className="flex flex-col gap-6">
        <h1 className="text-[48px] font-extrabold text-[#003f87] leading-[1.1] tracking-tight">
          {title}
        </h1>
        
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {participants.map((avatar, i) => (
              <div key={i} className="w-8 h-8 rounded-xl border-2 border-[#f7f9fb] overflow-hidden shadow-sm">
                <img src={avatar} alt="participant" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <span className="text-[#424752] text-sm font-medium">Sắp xếp theo:</span>
        </div>
      </div>

      {/* Featured Image */}
      <div className="w-full h-[492px] rounded-xl overflow-hidden shadow-lg border border-[rgba(30,58,138,0.05)] bg-[#eceef0]">
        <img src={featuredImage} alt="featured research" className="w-full h-full object-cover" />
      </div>

      {/* Body Content */}
      <div className="bg-white rounded-xl shadow-sm border border-[rgba(30,58,138,0.05)] p-8 md:p-12 flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          {/* Quote Section */}
          <div className="border-l-4 border-[#003f87] pl-8 py-2">
            <p className="text-[#0056b3] text-xl font-semibold italic leading-relaxed">
              "{content.quote}"
            </p>
          </div>

          <p className="text-[#191c1e] text-lg leading-relaxed">
            {content.intro}
          </p>
          
          <h3 className="text-2xl font-bold text-[#003f87] mt-4">
            {content.methodology.title}
          </h3>

          <p className="text-[#191c1e] text-lg leading-relaxed">
            {content.methodology.description}
          </p>

          <div className="flex flex-col gap-4 py-4">
            {content.methodology.points.map((point, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="shrink-0 mt-1 text-[#003f87]">
                  <CheckCircle2 size={20} />
                </div>
                <span className="text-[#191c1e] text-lg leading-relaxed">{point}</span>
              </div>
            ))}
          </div>

          <p className="text-[#191c1e] text-lg leading-relaxed">
            {content.methodology.conclusion}
          </p>
        </div>

        {/* Interaction Bar */}
        <div className="pt-8 border-t border-[rgba(194,198,212,0.15)] flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="bg-[#eceef0] flex items-center gap-2 px-4 py-2 rounded-xl text-[#1e3a8a] font-semibold hover:bg-[#dfe2e6] transition-colors">
              <Heart size={20} />
              {stats.likes.toLocaleString()}
            </button>
            <button className="flex items-center gap-2 text-[#424752] font-semibold hover:text-[#003f87] transition-colors">
              <MessageSquare size={20} />
              Trả lời
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-[#727784] hover:bg-[#eceef0] rounded-lg transition-colors"><Share2 size={20} /></button>
            <button className="p-2 text-[#727784] hover:bg-[#eceef0] rounded-lg transition-colors"><MoreHorizontal size={20} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
