"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { CategoryHero } from "@/components/shared/category/CategoryHero";
import { NutritionSidebar } from "@/components/nutrition/NutritionSidebar";
import { CategorySorting } from "@/components/shared/category/CategorySorting";
import { ArticleCard } from "@/components/shared/category/ArticleCard";
import { Pagination } from "@/components/shared/Pagination";
import nutritionData from "@/mock-data/nutrition.json";

const nutritionTabs = [
  { id: "trending", label: "Xu hướng" },
  { id: "recent", label: "Gần đây" },
  { id: "unanswered", label: "Chưa trả lời" },
];

export default function NutritionPage() {
  const [activeTab, setActiveTab] = useState("trending");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [activeTab, currentPage]);

  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      <Header />
      
      <main className="container mx-auto px-6 lg:px-32 pt-24">
        {/* Hero Section */}
        <CategoryHero 
          title={nutritionData.hero.title}
          description={nutritionData.description}
          breadcrumbs={nutritionData.hero.breadcrumbs}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[60px] mt-8">
          {/* Sidebar - Left (3/12) */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <NutritionSidebar 
              popularTags={nutritionData.sidebar.popularTags}
              relatedFields={nutritionData.sidebar.relatedFields}
              featured={nutritionData.sidebar.featured}
            />
          </div>

          {/* Main Feed - Right (9/12) */}
          <div className="lg:col-span-9 order-1 lg:order-2">
            <CategorySorting 
              tabs={nutritionTabs}
              activeTab={activeTab} 
              onTabChange={(id) => {
                setActiveTab(id);
                setCurrentPage(1);
              }} 
            />

            <div className="space-y-8">
              {loading ? (
                // Skeleton loading state
                [...Array(3)].map((_, i) => (
                  <div key={i} className="h-48 bg-white/50 animate-pulse rounded-2xl border border-slate-100" />
                ))
              ) : (
                nutritionData.posts.map((post, idx) => (
                  <ArticleCard 
                    key={post.id}
                    {...post}
                    idx={idx}
                  />
                ))
              )}
            </div>

            {/* Pagination Component */}
            <Pagination 
              currentPage={currentPage} 
              totalPages={12} 
              onPageChange={setCurrentPage} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}
