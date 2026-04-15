"use client";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Pagination } from "@/components/shared/Pagination";
import { ArticlesSidebar } from "@/components/articles/ArticlesSidebar";
import { ArticleHorizontalCard } from "@/components/articles/ArticleHorizontalCard";
import articleData from "@/mock-data/articles.json";
import { ChevronDown } from "lucide-react";

export default function ArticlesListingPage() {
  const { articles } = articleData;

  return (
    <main className="min-h-screen bg-[#f7f9fb] pt-24 pb-20">
      <div className="container mx-auto px-6 lg:px-20 max-w-[1440px]">
        
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: "Bài viết"},
          ]} 
          className="mb-8" 
        />

        {/* Page Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col gap-3 max-w-2xl">
            <h1 className="text-[48px] font-extrabold text-[#003f87] leading-tight tracking-tight">
              Bài viết nghiên cứu
            </h1>
            <p className="text-[#424752] text-lg font-medium leading-relaxed">
              Khám phá các phân tích lâm sàng mới nhất và các cuộc thảo luận chuyên sâu từ đội ngũ chuyên gia của Clinical Atelier.
            </p>
          </div>

          {/* Sort Filter */}
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-sm border border-[rgba(30,58,138,0.05)] cursor-pointer group hover:border-[#003f87]/20 transition-all">
            <span className="text-[#424752] text-sm font-medium">Sắp xếp theo:</span>
            <span className="text-[#003f87] text-sm font-bold flex items-center gap-2">
              Mới nhất
              <ChevronDown size={16} className="text-[#727784] group-hover:text-[#003f87] transition-colors" />
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left Sidebar */}
          <aside className="w-full lg:w-[320px] shrink-0 sticky top-36 hidden lg:block">
            <ArticlesSidebar />
          </aside>

          {/* Main List Area */}
          <div className="flex-grow min-w-0 flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              {articles.map((article, idx) => (
                <ArticleHorizontalCard 
                  key={article.id}
                  title={article.title}
                  snippet={article.snippet}
                  category={article.category}
                  date={article.date}
                  author={article.author}
                  stats={article.stats}
                  featuredImage={article.featuredImage}
                  slug={article.slug}
                  idx={idx}
                />
              ))}
            </div>

            {/* Pagination Area */}
            <div className="mt-12 flex justify-center lg:justify-end">
              <Pagination 
                currentPage={1}
                totalPages={12}
                onPageChange={() => {}}
              />
            </div>
          </div>

          {/* Mobile Sidebar (optional, or hidden) */}
          <div className="w-full lg:hidden pt-8 border-t border-[#eceef0]">
            <ArticlesSidebar />
          </div>

        </div>
      </div>
    </main>
  );
}
