"use client";

import React from "react";
import { MessageSquare, Heart, CornerRightDown, MoreHorizontal, Send, Bold, Italic, Link as LinkIcon, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
    isVerified?: boolean;
    isAuthor?: boolean;
  };
  time: string;
  content: string;
  likes: number;
  replies?: Comment[];
}

interface CommentSectionProps {
  comments: Comment[];
  totalComments: number;
}

function CommentItem({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) {
  return (
    <div className={cn("flex gap-4 w-full", isReply && "pl-8 md:pl-12")}>
      <div className={cn("shrink-0", isReply ? "w-8 h-8" : "w-10 h-10")}>
        <div className="rounded-xl overflow-hidden border-2 border-white shadow-sm w-full h-full">
          <img src={comment.author.avatar} alt={comment.author.name} className="w-full h-full object-cover" />
        </div>
      </div>
      
      <div className="flex-grow flex flex-col gap-2">
        <div className={cn(
          "bg-[#f2f4f6] rounded-bl-2xl rounded-br-2xl rounded-tr-2xl p-5 border border-transparent",
          comment.author.isAuthor && "bg-[#e6e8ea] border-[#003f87]/10"
        )}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#003f87] text-sm">{comment.author.name}</span>
              {comment.author.isVerified && (
                <div className="bg-[#80f98b] px-2 py-0.5 rounded-full">
                  <span className="text-[#007327] text-[8px] font-bold uppercase tracking-tighter">Verified Expert</span>
                </div>
              )}
              {comment.author.isAuthor && (
                <div className="bg-[#003f87] px-2 py-0.5 rounded-sm">
                  <span className="text-white text-[8px] font-bold uppercase">Tác giả</span>
                </div>
              )}
            </div>
            <span className="text-[#727784] text-xs">{comment.time}</span>
          </div>
          
          <p className="text-sm text-[#191c1e] leading-relaxed">
            {comment.content}
          </p>
        </div>

        <div className="flex items-center gap-6 px-1">
          <button className="flex items-center gap-1.5 text-xs font-semibold text-[#727784] hover:text-[#003f87] transition-colors">
            <Heart size={14} />
            {comment.likes}
          </button>
          <button className="text-xs font-semibold text-[#727784] hover:text-[#003f87] transition-colors">
            Trả lời
          </button>
          <button className="text-xs font-semibold text-[#727784] hover:text-[#003f87] transition-colors">
            Báo cáo
          </button>
        </div>

        {comment.replies && comment.replies.map(reply => (
          <CommentItem key={reply.id} comment={reply} isReply={true} />
        ))}
      </div>
    </div>
  );
}

export function CommentSection({ comments, totalComments }: CommentSectionProps) {
  return (
    <div className="w-full flex flex-col gap-8 py-8 border-t border-[rgba(194,198,212,0.15)] mt-12">
      <div className="flex items-end justify-between">
        <h3 className="text-2xl font-bold text-[#003f87]">Thảo luận ({totalComments})</h3>
        <div className="flex items-center gap-2">
          <span className="text-[#424752] text-sm">Sắp xếp theo:</span>
          <button className="text-[#003f87] text-sm font-semibold flex items-center gap-1">
            Phù hợp nhất
            <CornerRightDown size={14} />
          </button>
        </div>
      </div>

      {/* New Comment Input */}
      <div className="bg-[#f2f4f6] border border-[rgba(194,198,212,0.1)] rounded-xl p-6 flex flex-col gap-4">
        <textarea 
          placeholder="Chia sẻ kinh nghiệm lâm sàng hoặc đặt câu hỏi..."
          className="bg-transparent border-none focus:ring-0 w-full min-h-[100px] text-base text-[#191c1e] placeholder-[#c2c6d4] resize-none"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="p-2 text-[#727784] hover:bg-white/50 rounded-lg transition-colors"><Bold size={18} /></button>
            <button className="p-2 text-[#727784] hover:bg-white/50 rounded-lg transition-colors"><Italic size={18} /></button>
            <button className="p-2 text-[#727784] hover:bg-white/50 rounded-lg transition-colors"><ImageIcon size={18} /></button>
            <button className="p-2 text-[#727784] hover:bg-white/50 rounded-lg transition-colors"><LinkIcon size={18} /></button>
          </div>
          <button className="bg-gradient-to-br from-[#003f87] to-[#0056b3] text-white px-8 py-2 rounded-lg font-semibold text-sm hover:scale-[1.02] transition-transform flex items-center gap-2 shadow-md">
            Gửi bình luận
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="flex flex-col gap-8">
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>

      <button className="w-full py-4 border border-[rgba(194,198,212,0.15)] rounded-xl text-[#003f87] font-bold text-base hover:bg-white/5 transition-colors">
        Tải thêm thảo luận
      </button>
    </div>
  );
}
