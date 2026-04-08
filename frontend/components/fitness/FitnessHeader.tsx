"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const tags = ["Tất cả", "Tập gym", "Cardio", "Phục hồi", "Calisthenics"];

export function FitnessHeader() {
  const [activeTag, setActiveTag] = useState("Tất cả");

  return (
    <div className="flex flex-col gap-3 w-full">
      <h1 className="text-[36px] font-extrabold text-[#191c1e] tracking-tight leading-[1.1]">
        Thảo luận về Thể hình & Hiệu suất
      </h1>
      <p className="text-[#424752] text-lg max-w-2xl leading-relaxed">
        Cộng đồng chia sẻ kinh nghiệm tập luyện, tối ưu hóa thể chất và phục hồi dựa trên khoa học.
      </p>

      {/* Tag Filters */}
      <div className="flex gap-2 overflow-x-auto pb-4 pt-5 scrollbar-hide">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={cn(
              "px-4 py-1.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap",
              activeTag === tag
                ? "bg-[#80f98b] text-[#007327]"
                : "bg-[#eceef0] text-[#424752] hover:bg-[#e2e4e6]"
            )}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
