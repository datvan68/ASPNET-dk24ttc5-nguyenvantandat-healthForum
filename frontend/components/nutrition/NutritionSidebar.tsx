"use client";

import { motion } from "framer-motion";
import { ChevronRight, Hash, FlaskConical, MoveRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface Tag {
  label: string;
  color: string;
}

interface Featured {
  title: string;
  tag: string;
  imageUrl: string;
}

interface NutritionSidebarProps {
  popularTags: Tag[];
  relatedFields: string[];
  featured: Featured;
}

export function NutritionSidebar({ popularTags, relatedFields, featured }: NutritionSidebarProps) {
  return (
    <aside className="w-full space-y-[40px]">
      {/* Popular Tags */}
      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <Hash size={20} className="text-[#1e3a8a]" />
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest leading-none">Thẻ phổ biến</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Badge key={tag.label} className={`${tag.color} border-none text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm cursor-pointer hover:opacity-80 transition-opacity`}>
              {tag.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Related Fields */}
      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <FlaskConical size={20} className="text-[#1e3a8a]" />
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest leading-none">Lĩnh vực liên quan</h3>
        </div>
        <div className="space-y-4">
          {relatedFields.map((field) => (
            <button 
              key={field} 
              className="w-full flex items-center justify-between text-sm font-semibold text-slate-600 hover:text-[#1e3a8a] transition-colors group"
            >
              <span>{field}</span>
              <ChevronRight size={16} className="text-slate-300 group-hover:text-[#1e3a8a] transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Featured Card */}
      <div className="relative h-[300px] rounded-2xl overflow-hidden group cursor-pointer">
        <img 
          src={featured.imageUrl} 
          alt={featured.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <Badge className="bg-[#80f98b] text-[#007327] mb-3 text-[9px] font-extrabold px-2 py-0.5 rounded-none tracking-widest">
            {featured.tag}
          </Badge>
          <h4 className="text-lg font-bold text-white leading-tight line-clamp-3">
            {featured.title}
          </h4>
        </div>
      </div>
    </aside>
  );
}
