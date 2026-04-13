"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { PostCard } from "@/components/shared/PostCard";
import { PlusCircle } from "lucide-react";

interface Post {
  id: number;
  title: string;
  snippet: string;
  category: string;
  createdAt: string;
  commentCount: number;
  likeCount: number;
  commentIconUrl?: string | null;
  likeIconUrl?: string | null;
}

interface ProfileTabsProps {
  posts: Post[];
}

export function ProfileTabs({ posts }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState("Bài viết của tôi");

  const tabs = ["Bài viết của tôi", "Kiến thức đã lưu", "Cài đặt"];

  return (
    <section className="bg-[#f2f4f6] rounded-[8px] overflow-hidden w-full max-w-[1228px] mx-auto mb-16 border border-[rgba(194,198,212,0.2)]">
      {/* Tab Navigation */}
      <div className="flex border-b border-[rgba(194,198,212,0.2)] px-[32px]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative py-[22px] px-[32px] text-[14px] font-medium transition-colors ${
              activeTab === tab ? "text-[#003f87] font-semibold" : "text-[#424752] hover:bg-[#f2f4f6]/50"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div 
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#003f87] border-b-2 border-solid border-[#003f87]" 
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-8 pb-12">
        <AnimatePresence mode="wait">
          {activeTab === "Bài viết của tôi" && (
            <motion.div
              key="myposts"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-[24px]"
            >
              {posts.map((post, i) => (
                <PostCard key={post.id} {...post} idx={i} />
              ))}
              
              {/* Add New Post Placeholder */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                className="border-2 border-dashed border-[rgba(194,198,212,0.3)] rounded-[8px] h-[253.5px] p-[26px] flex flex-col items-center justify-center gap-[8px] transition-colors hover:bg-white/50"
              >
                <div className="size-[25px] flex items-center justify-center">
                  <PlusCircle size={25} className="text-[#c2c6d4]" />
                </div>
                <span className="text-[14px] font-semibold text-[#727784] font-['Inter',sans-serif] text-center">
                  Bắt đầu thảo luận mới
                </span>
              </motion.button>
            </motion.div>
          )}

          {activeTab !== "Bài viết của tôi" && ( activeTab === "Cài đặt" ? (
            <motion.div
              key="settings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-64 flex flex-col items-center justify-center gap-4 bg-white rounded-lg border border-slate-100"
            >
              <div className="size-12 rounded-full bg-slate-50 flex items-center justify-center">
                 <div className="size-6 border-2 border-slate-200 border-t-[#003f87] animate-spin rounded-full" />
              </div>
              <p className="text-[#424752] font-medium">Đang tải cấu hình...</p>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-64 flex items-center justify-center text-[#727784] italic text-sm"
            >
              Chưa có nội dung để hiển thị...
            </motion.div>
          )) }
        </AnimatePresence>
      </div>
    </section>
  );
}
