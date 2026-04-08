"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Eye, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FitnessPostCardProps {
  id: number;
  title: string;
  snippet: string;
  author: string;
  category: string;
  timestamp: string;
  likes: number | string;
  comments: number;
  imageUrl?: string;
  variant?: "standard" | "highlight";
  idx?: number;
}

export function FitnessPostCard({
  title,
  snippet,
  author,
  category,
  timestamp,
  likes,
  comments,
  imageUrl,
  variant = "standard",
  idx = 0
}: FitnessPostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
      whileHover={{ scale: 1.002, x: 2 }}
      className={cn(
        "p-6 rounded-xl transition-all group cursor-pointer",
        variant === "highlight" 
          ? "bg-[#eceef0] border-l-4 border-[#003f87]" 
          : "bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
      )}
    >
      <div className="flex gap-6 items-start">
        {imageUrl && variant === "standard" && (
          <div className="w-32 h-32 rounded-lg overflow-hidden shrink-0 hidden md:block">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
            />
          </div>
        )}

        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Badge className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide border-none",
                category === "Dinh dưỡng" ? "bg-[rgba(128,249,139,0.5)] text-[#007327]" : 
                category === "Hỏi đáp" ? "bg-[#ffdbcc] text-[#351000]" : 
                "bg-[rgba(128,249,139,0.5)] text-[#007327]"
              )}>
                {category}
              </Badge>
            </div>
            <span className="text-[#424752] text-[12px] font-medium opacity-80">{timestamp}</span>
          </div>

          <h3 className={cn(
            "text-[18px] font-bold text-[#191c1e] leading-tight group-hover:text-[#0056b3] transition-colors",
            variant === "highlight" ? "mt-1" : ""
          )}>
            {title}
          </h3>

          <p className="text-sm text-[#424752] leading-relaxed line-clamp-2 opacity-90">
            {snippet}
          </p>

          <div className="flex items-center justify-between mt-2">
            <div className="text-[12px] font-medium text-[#424752]">
              Bởi <span className="font-bold text-[#191c1e]">{author}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Heart size={14} />
                <span className="text-[12px] font-medium text-[#424752]">{likes}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <MessageSquare size={14} />
                <span className="text-[12px] font-medium text-[#424752]">{comments}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
