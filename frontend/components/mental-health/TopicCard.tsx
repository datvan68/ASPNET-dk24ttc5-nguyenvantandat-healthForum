"use client";

import { motion } from "framer-motion";
import { MoveRight, TrendingUp, Apple, Dumbbell, Brain, Zap, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const icons: Record<string, any> = { Apple, Dumbbell, Brain, Zap };

export type TopicVariant = "light-illustrated" | "dark-prominent" | "minimal" | "horizontal-wide";

interface TopicCardProps {
  id: string;
  title: string;
  description: string;
  discussionCount: string;
  fileCount: string;
  imageUrl: string;
  icon?: string;
  variant?: TopicVariant;
  badge?: string;
  avatars?: string[];
  span?: string; // Tailwind grid span
  idx?: number;
}

export function TopicCard({
  title,
  description,
  discussionCount,
  fileCount,
  imageUrl,
  icon,
  variant = "minimal",
  badge,
  avatars = [],
  span = "col-span-1",
  idx = 0
}: TopicCardProps) {
  const Icon = icon ? icons[icon] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1 }}
      whileHover={{ y: -5 }}
      className={cn(
        "relative rounded-[32px] overflow-hidden group cursor-pointer transition-all duration-500",
        variant === "dark-prominent" || variant === "light-illustrated" ? "h-[328.5px]" : "h-[298px]",
        variant === "dark-prominent" ? "bg-[#003f87] text-white" : "",
        variant === "light-illustrated" ? "bg-[#f2f4f6]" : "",
        variant === "minimal" ? "bg-[#eceef0]" : "",
        variant === "horizontal-wide" ? "bg-white border border-[rgba(194,198,212,0.15)]" : "",
        span
      )}
    >
      {/* Nutrition illustration (bottom-right) - Refined to match Figma subtle detail */}
      {variant === "light-illustrated" && (
        <div className="absolute -bottom-10 -right-10 w-72 h-72 pointer-events-none opacity-10 rotate-[10.89deg] skew-x-[-2.32deg] group-hover:scale-110 transition-transform duration-700">
           <img src={imageUrl} alt="illustration" className="w-full h-full object-contain" />
        </div>
      )}

      {/* Fitness bg accent (solid in Figma 118:103, no gradient needed) */}

      <div className={cn(
        "absolute inset-0 p-8 flex flex-col justify-between",
        variant === "horizontal-wide" ? "md:flex-row gap-8 items-center" : ""
      )}>
        <div className={cn(
            variant === "horizontal-wide" ? "md:w-px md:flex-grow" : "w-full"
        )}>
           <div className="mb-4 flex items-start justify-between">
              {variant === "horizontal-wide" ? (
                 <Badge className="bg-[#80f98b] text-[#007327] text-[10px] font-semibold px-3 py-1 rounded-xl tracking-[1px] uppercase border-none hover:bg-[#80f98b]">
                    {badge}
                 </Badge>
              ) : (
                 <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center",
                    variant === "dark-prominent" ? "bg-white/10" : "bg-transparent text-[#003f87]"
                 )}>
                    {Icon && <Icon size={28} className={variant === "dark-prominent" ? "text-[#80f98b]" : ""} strokeWidth={2.5} />}
                 </div>
              )}
           </div>

           <h3 className={cn(
              "text-2xl font-bold leading-tight mb-2",
              variant === "dark-prominent" ? "text-white" : "text-[#191c1e]"
           )}>
              {title}
           </h3>
           <p className={cn(
              "font-normal leading-relaxed max-w-[95%]",
              variant === "minimal" ? "text-sm text-[#424752]" : "text-base",
              variant === "dark-prominent" ? "text-blue-100/80" : "text-[#424752]"
           )}>
              {description}
           </p>

           {/* Avatars for Nutrition variant */}
           {variant === "light-illustrated" && avatars.length > 0 && (
             <div className="flex items-center gap-1 mt-6">
               <div className="flex -space-x-2">
                 {avatars.slice(0, 2).map((av, i) => (
                   <div key={i} className="w-10 h-10 rounded-xl border-2 border-[#f2f4f6] overflow-hidden bg-slate-200">
                     <img src={av} alt="participant" className="w-full h-full object-cover" />
                   </div>
                 ))}
                 {avatars.length > 2 && (
                   <div className="w-10 h-10 rounded-xl border-2 border-[#f2f4f6] bg-[#0056b3] flex items-center justify-center text-[12px] font-bold text-white">
                     +{avatars.length - 2}
                   </div>
                 )}
               </div>
             </div>
           )}
        </div>

        <div className={cn(
          "flex items-center text-xs font-semibold uppercase tracking-wider",
          variant === "horizontal-wide" ? "md:w-[192px] md:h-[128px] shrink-0" : "justify-start"
        )}>
          {variant === "horizontal-wide" ? (
             <div className="w-full h-40 md:h-full relative rounded-2xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500 shadow-sm">
                <img src={imageUrl} alt="research" className="w-full h-full object-cover" />
             </div>
          ) : (
            variant === "dark-prominent" ? (
             <div className="flex items-center gap-4 text-[#d7e2ff]">
                <span>{discussionCount} Discussions</span>
                <span className="opacity-40">|</span>
                <span>{fileCount} Files</span>
             </div>
            ) : null
          )}
        </div>
      </div>
    </motion.div>
  );
}
