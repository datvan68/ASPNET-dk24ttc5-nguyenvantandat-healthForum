"use client";

import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface SortingTab {
  id: string;
  label: string;
}

interface CategorySortingProps {
  tabs: SortingTab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
  showFilter?: boolean;
}

export function CategorySorting({ 
  tabs, 
  activeTab, 
  onTabChange, 
  className = "",
  showFilter = true
}: CategorySortingProps) {
  return (
    <div className={cn("flex items-center justify-between gap-8 border-b border-slate-100 mb-[40px] pb-2 overflow-x-auto no-scrollbar", className)}>
      <div className="flex items-center gap-[40px]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "relative pb-4 text-sm font-bold uppercase tracking-widest transition-colors whitespace-nowrap",
              activeTab === tab.id ? "text-[#1e3a8a]" : "text-slate-400 hover:text-slate-600"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-1 bg-[#1e3a8a] rounded-t-full"
              />
            )}
          </button>
        ))}
      </div>

      {showFilter && (
        <button className="flex items-center gap-3 text-slate-400 hover:text-slate-600 font-bold uppercase tracking-widest text-sm transition-colors mb-4 whitespace-nowrap">
          <Filter size={18} />
          <span>Bộ lọc</span>
        </button>
      )}
    </div>
  );
}
