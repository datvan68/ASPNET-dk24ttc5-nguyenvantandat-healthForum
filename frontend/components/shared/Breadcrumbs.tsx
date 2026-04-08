"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav className={cn("flex items-center gap-2 text-sm text-[#727784] font-medium mb-6", className)}>
      <Link 
        href="/" 
        className="hover:text-[#003f87] transition-colors flex items-center gap-1 group"
      >
        <Home size={14} className="group-hover:scale-110 transition-transform" />
        <span className="sr-only">Home</span>
      </Link>

      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight size={14} className="text-slate-300 shrink-0" />
          {item.href ? (
            <Link 
              href={item.href} 
              className="hover:text-[#003f87] transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[#003f87] font-semibold truncate">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
