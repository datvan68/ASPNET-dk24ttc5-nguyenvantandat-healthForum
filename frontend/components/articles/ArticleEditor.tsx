"use client";

import React from "react";
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Type, 
  Quote 
} from "lucide-react";

interface ArticleEditorProps {
  title: string;
  setTitle: (val: string) => void;
  content: string;
  setContent: (val: string) => void;
}

export function ArticleEditor({ title, setTitle, content, setContent }: ArticleEditorProps) {
  return (
    <div className="flex flex-col gap-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Info */}
      <div className="flex flex-col gap-2">
        <h1 className="text-[36px] font-extrabold text-[#003f87] font-manrope leading-[1.1] tracking-tight">
          Tạo Bài Viết Mới
        </h1>
        <p className="text-[#424752] text-lg font-inter">
          Chia sẻ kiến thức lâm sàng và thảo luận cùng cộng đồng chuyên gia.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Title Input Area */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden group transition-all duration-300 focus-within:shadow-md focus-within:border-blue-200">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Tiêu đề bài viết"
            className="w-full px-8 py-10 text-[30px] font-bold text-[#003f87] placeholder:text-slate-300 focus:outline-none bg-transparent"
          />
        </div>

        {/* Rich Text Editor Simulation */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-[600px] transition-all duration-300 focus-within:border-blue-300">
          {/* Toolbar */}
          <div className="bg-[#f8fafc] border-b border-slate-200 px-4 py-3 flex items-center gap-2">
            <ToolbarButton icon={<Bold size={18} />} label="Bold" />
            <ToolbarButton icon={<Italic size={18} />} label="Italic" />
            <ToolbarButton icon={<ListOrdered size={18} />} label="Numbered List" />
            <ToolbarButton icon={<List size={18} />} label="Bullet List" />
            
            <div className="w-px h-6 bg-slate-300 mx-2" />
            
            <ToolbarButton icon={<LinkIcon size={18} />} label="Link" />
            <ToolbarButton icon={<ImageIcon size={18} />} label="Image" />
            <ToolbarButton icon={<Quote size={18} />} label="Quote" />
            <ToolbarButton icon={<Type size={18} />} label="Formats" />
          </div>

          {/* Editable Content Area */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Nội dung bài thảo luận..."
            className="flex-1 w-full p-8 text-lg text-[#1e293b] leading-relaxed placeholder:text-slate-300 focus:outline-none resize-none bg-transparent"
          />
        </div>
      </div>
    </div>
  );
}

function ToolbarButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button 
      type="button" 
      title={label}
      className="p-2 text-slate-600 hover:text-blue-600 hover:bg-white rounded-md transition-all active:scale-95"
    >
      {icon}
    </button>
  );
}
