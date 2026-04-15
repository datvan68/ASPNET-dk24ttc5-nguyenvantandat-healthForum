"use client";

import React from "react";
import { MessageSquare, Heart, CornerRightDown, Send, Bold, Italic, Link as LinkIcon, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
    title?: string;
    roleBadge?: string;
  };
  time: string;
  content: string;
  likes: number;
}

interface CommentSectionProps {
  comments: Comment[];
  totalComments: number;
}

function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className="flex gap-6 w-full">
      <div className="shrink-0 w-12 h-12">
        <div className="rounded-2xl overflow-hidden border-2 border-white shadow-md w-full h-full">
          <img src={comment.author.avatar} alt={comment.author.name} className="w-full h-full object-cover" />
        </div>
      </div>
      
      <div className="flex-grow flex flex-col gap-4">
        <div className="bg-white rounded-2xl p-8 border border-[rgba(30,58,138,0.05)] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-[#191c1e] text-base">{comment.author.name}</span>
                {comment.author.roleBadge && (
                  <div className="bg-[#80f98b] px-3 py-1 rounded-md">
                    <span className="text-[#007327] text-[9px] font-bold uppercase tracking-wider">{comment.author.roleBadge}</span>
                  </div>
                )}
              </div>
              {comment.author.title && (
                <span className="text-[#727784] text-[12px] font-medium">{comment.author.title}</span>
              )}
            </div>
            <span className="text-[#727784] text-[13px] font-medium">{comment.time}</span>
          </div>
          
          <p className="text-[#191c1e] text-[16px] leading-[1.6] font-medium">
            {comment.content}
          </p>

          <div className="flex items-center gap-6 mt-8 pt-6 border-t border-[#eceef0]">
            <button className="flex items-center gap-2 text-sm font-bold text-[#424752] hover:text-[#003f87] transition-colors group">
              <CornerRightDown size={18} className="text-[#003f87] group-hover:scale-110 transition-transform" />
              Phản hồi
            </button>
            <button className="flex items-center gap-2 text-sm font-bold text-[#424752] hover:text-[#ff4d4d] transition-colors group">
              <Heart size={18} className="text-[#ff4d4d] group-hover:scale-110 transition-transform" />
              {comment.likes}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CommentSection({ comments, totalComments }: CommentSectionProps) {
  return (
    <div className="w-full flex flex-col gap-10 py-12 border-t border-[#eceef0] mt-16">
      <div className="flex items-end justify-between px-2">
        <h3 className="text-2xl font-extrabold text-[#191c1e]">Thảo luận chuyên môn</h3>
      </div>

      {/* New Comment Input */}
      <div className="bg-[#f7f9fb] border border-[rgba(194,198,212,0.1)] rounded-2xl p-8 shadow-inner flex flex-col gap-6">
        <textarea 
          placeholder="Viết bình luận chuyên môn của bạn..."
          className="bg-transparent border-none focus:ring-0 w-full min-h-[120px] text-[17px] text-[#191c1e] placeholder-[#727784] resize-none font-medium leading-relaxed"
        />
        <div className="flex items-center justify-between border-t border-[#eceef0] pt-6">
          <div className="flex items-center gap-2">
            <button className="p-2.5 text-[#727784] hover:bg-white hover:shadow-sm rounded-xl transition-all"><Bold size={20} /></button>
            <button className="p-2.5 text-[#727784] hover:bg-white hover:shadow-sm rounded-xl transition-all"><Italic size={20} /></button>
            <button className="p-2.5 text-[#727784] hover:bg-white hover:shadow-sm rounded-xl transition-all"><ImageIcon size={20} /></button>
            <button className="p-2.5 text-[#727784] hover:bg-white hover:shadow-sm rounded-xl transition-all"><LinkIcon size={20} /></button>
          </div>
          <Button className="bg-[#003f87] hover:bg-[#0052cc] text-white px-10 py-3 rounded-xl font-bold text-base transition-all shadow-md">
            Gửi bình luận
          </Button>
        </div>
      </div>

      {/* Comments List */}
      <div className="flex flex-col gap-10 mt-4">
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>

      <button className="w-full py-5 border border-[#eceef0] rounded-2xl text-[#003f87] font-extrabold text-[17px] hover:bg-white hover:shadow-sm transition-all mt-6">
        Xem tất cả thảo luận ({totalComments})
      </button>
    </div>
  );
}
