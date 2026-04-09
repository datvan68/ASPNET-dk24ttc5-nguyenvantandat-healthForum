"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface Author {
  fullName: string;
  title: string;
  avatarUrl: string;
}

interface ArticleCardProps {
  id: number;
  title: string;
  snippet: string;
  author: Author;
  tags: string[];
  createdAt: string;
  commentCount: number;
  viewCount: number;
  isVerified: boolean;
  idx?: number;
  className?: string;
}

export function ArticleCard({
  title,
  snippet,
  author,
  createdAt,
  commentCount,
  viewCount,
  isVerified,
  idx = 0,
  className = ""
}: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
      whileHover={{ scale: 1.002, x: 2 }}
      className={`bg-white p-8 rounded-[16px] border border-[rgba(194,198,212,0.1)] shadow-sm hover:shadow-md transition-all group cursor-pointer ${className}`}
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Author Avatar */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-[12px] overflow-hidden">
             <img 
               src={author.avatarUrl} 
               alt={author.fullName} 
               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
             />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="font-semibold text-[#191c1e] text-[16px] leading-tight">
                {author.fullName}
              </div>
              <div className="text-[12px] text-[#424752] tracking-[0.3px]">
                {author.title} • {createdAt}
              </div>
            </div>
            {isVerified && (
              <Badge className="bg-[#80f98b] text-[#007327] text-[10px] font-semibold px-3 py-1 rounded-[12px] tracking-[1px] uppercase border-none hover:bg-[#80f98b]">
                Verified Expert
              </Badge>
            )}
          </div>

          <h3 className="text-[20px] font-bold text-[#191c1e] leading-[28px] group-hover:text-[#003f87] transition-colors font-manrope">
            {title}
          </h3>

          <p className="text-[16px] text-[#424752] leading-[26px] opacity-90 line-clamp-2">
            {snippet}
          </p>

          <div className="flex items-center gap-6 pt-3">
             <div className="flex items-center gap-1.5 text-[#424752]">
                <img src="/assets/icon-replies.svg" alt="Replies" className="w-[13.33px] h-[13.33px]" />
                <span className="text-[14px] leading-[20px]">{commentCount} replies</span>
             </div>
             <div className="flex items-center gap-1.5 text-[#424752]">
                <img src="/assets/icon-views.svg" alt="Views" className="w-[14.67px] h-[10px]" />
                <span className="text-[14px] leading-[20px]">{viewCount >= 1000 ? `${(viewCount / 1000).toFixed(1)}k` : viewCount} views</span>
             </div>
             <div className="flex items-center gap-1.5 text-[#424752] cursor-pointer hover:text-[#003f87]">
                <img src="/assets/icon-save.svg" alt="Save" className="w-[9.33px] h-[12px]" />
                <span className="text-[14px] leading-[20px]">Save</span>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

