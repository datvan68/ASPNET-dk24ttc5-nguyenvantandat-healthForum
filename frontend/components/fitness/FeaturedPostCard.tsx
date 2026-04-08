"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FeaturedPostCardProps {
  title: string;
  snippet: string;
  imageUrl: string;
  author: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  likes: number;
  comments: number;
}

export function FeaturedPostCard({
  title,
  snippet,
  imageUrl,
  author,
  timestamp,
  likes,
  comments,
}: FeaturedPostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 group cursor-pointer w-full"
    >
      <div className="w-full h-[250px] relative overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="p-8 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Badge className="bg-transparent text-[#003f87] text-[12px] font-bold uppercase tracking-[1.2px] border-none p-0 flex items-center gap-2">
            Nổi bật
          </Badge>
          <span className="text-[#cbd5e1]">•</span>
          <span className="text-[#424752] text-xs font-medium">{timestamp}</span>
        </div>

        <h2 className="text-2xl font-bold text-[#191c1e] leading-tight group-hover:text-[#0056b3] transition-colors">
          {title}
        </h2>

        <p className="text-base text-[#424752] leading-relaxed line-clamp-2 opacity-90">
          {snippet}
        </p>

        <div className="flex items-center justify-between mt-3 pt-4 border-t border-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl overflow-hidden border border-slate-100 shadow-sm">
              <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-bold text-[#191c1e]">{author.name}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Heart size={16} />
              <span className="text-xs font-bold text-[#424752]">{likes}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <MessageSquare size={16} />
              <span className="text-xs font-bold text-[#424752]">{comments}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
