"use client";

import React, { useState } from "react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ArticleEditor } from "@/components/articles/ArticleEditor";
import { CreationSidebar } from "@/components/articles/CreationSidebar";
import { TagInput } from "@/components/articles/TagInput";

export default function CreateArticlePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Dinh dưỡng");
  const [tags, setTags] = useState(["cardiology"]);

  const handlePost = () => {
    alert(`Đang đăng bài viết: ${title}\nChuyên mục: ${category}\nTags: ${tags.join(", ")}`);
  };

  const handleSaveDraft = () => {
    alert("Đã lưu bản nháp thành công!");
  };

  return (
    <main className="min-h-screen bg-[#f7f9fb] pt-28 pb-32">
      <div className="container mx-auto px-6 lg:px-24">
        
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: "Bài viết", href: "/articles" },
            { label: "Tạo bài viết mới" },
          ]} 
          className="mb-10"
        />

        <div className="flex flex-col xl:flex-row gap-12 items-start max-w-[1400px] mx-auto">
          
          {/* Main Content Column */}
          <div className="flex-1 flex flex-col gap-12 w-full max-w-[1000px]">
            <ArticleEditor 
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
            />

            <TagInput 
              category={category}
              setCategory={setCategory}
              tags={tags}
              setTags={setTags}
            />

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-6 pt-8 animate-in fade-in slide-in-from-right-4 duration-700 delay-500">
              <button
                onClick={handleSaveDraft}
                className="px-8 py-3.5 text-[#003f87] font-bold font-manrope hover:bg-white rounded-xl transition-all active:scale-95"
              >
                Lưu bản nháp
              </button>
              <button
                onClick={handlePost}
                className="px-10 py-3.5 bg-gradient-to-br from-[#003f87] to-[#0056b3] text-white font-bold font-manrope rounded-xl shadow-[0_10px_20px_-5px_rgba(0,63,135,0.3)] hover:shadow-[0_15px_25px_-5px_rgba(0,63,135,0.4)] transition-all hover:-translate-y-0.5 active:scale-95"
              >
                Đăng bài viết
              </button>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="w-full xl:w-[380px] shrink-0 xl:sticky xl:top-36">
            <CreationSidebar />
          </div>

        </div>
      </div>
    </main>
  );
}