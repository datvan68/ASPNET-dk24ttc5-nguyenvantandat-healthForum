"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
        pages.push(i);
    }
    if (totalPages > 3) {
      if (totalPages > 4) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-6 mt-16 pb-20">
      <button 
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="text-slate-400 hover:text-[#1e3a8a] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="flex items-center gap-2">
        {getPages().map((page, idx) => (
          <button
            key={idx}
            onClick={() => typeof page === "number" && onPageChange(page)}
            className={cn(
              "w-10 h-10 rounded-lg text-sm font-bold transition-all",
              currentPage === page 
                ? "bg-[#1e3a8a] text-white shadow-lg" 
                : typeof page === "number"
                  ? "text-slate-400 hover:bg-slate-100 hover:text-slate-800"
                  : "text-slate-300 cursor-default"
            )}
          >
            {page}
          </button>
        ))}
      </div>

      <button 
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="text-slate-400 hover:text-[#1e3a8a] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
