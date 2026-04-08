"use client";

import { motion } from "framer-motion";
import { MessageSquare, Eye } from "lucide-react";
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
  id,
  title,
  snippet,
  author,
  tags,
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
      className={`bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-pointer ${className}`}
    >
      <div className="flex flex-col md:flex-row gap-[40px]">
        {/* Author Avatar & Status */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm">
             <img 
               src={author.avatarUrl} 
               alt={author.fullName} 
               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
             />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-3">
             {isVerified && (
               <Badge className="bg-[#80f98b] text-[#007327] text-[9px] font-extrabold px-1.5 py-0.5 rounded-none tracking-widest border-none">
                 {author.title.toUpperCase()}
               </Badge>
             )}
             <span className="text-xs font-bold text-slate-500">By {author.fullName}</span>
             <span className="text-xs font-bold text-slate-300">•</span>
             <span className="text-xs font-bold text-slate-400">{createdAt}</span>
          </div>

          <h3 className="text-2xl font-extrabold text-[#191c1e] leading-[1.1] mb-3 group-hover:text-[#0056b3] transition-colors">
            {title}
          </h3>

          <p className="text-[15px] text-[#424752] leading-relaxed mb-6 opacity-80 line-clamp-2">
            {snippet}
          </p>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div className="flex flex-wrap gap-2">
               {tags.map((tag) => (
                 <Badge 
                   key={tag} 
                   variant="secondary" 
                   className="bg-[#f2f4f6] text-[#727784] text-[10px] font-bold uppercase py-1 px-3 rounded-full border-none tracking-widest"
                 >
                   {tag}
                 </Badge>
               ))}
             </div>

             <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-slate-400">
                   <MessageSquare size={16} />
                   <span className="text-xs font-bold">{commentCount} Replies</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                   <Eye size={16} />
                   <span className="text-xs font-bold">{(viewCount / 1000).toFixed(1)}k Views</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
