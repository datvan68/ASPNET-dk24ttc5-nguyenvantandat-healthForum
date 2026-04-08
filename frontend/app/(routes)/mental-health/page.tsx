"use client";

import { Header } from "@/components/layout/Header";
import { MentalHealthHero } from "@/components/mental-health/MentalHealthHero";
import { MentalHealthSidebar } from "@/components/mental-health/MentalHealthSidebar";
import { TopicCard } from "@/components/mental-health/TopicCard";
import { ArticleCard } from "@/components/shared/category/ArticleCard";
import mentalHealthData from "@/mock-data/mental-health.json";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function MentalHealthPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-6 lg:px-32 pt-24">
        {/* Hub Hero */}
        <MentalHealthHero 
          title={mentalHealthData.hero.title}
          description={mentalHealthData.hero.description}
          breadcrumbs={mentalHealthData.hero.breadcrumbs}
          imageUrl={mentalHealthData.hero.imageUrl}
        />

        {/* Topic Grid Section */}
        <section className="py-20 lg:px-0">
           <div className="mb-12">
              <h2 className="text-[30px] font-bold text-[#003f87] mb-2">Nhóm chuyên đề tuyển chọn</h2>
              <p className="text-[#424752] text-[16px] max-w-3xl leading-relaxed">
                 Chào mừng bạn đến với Aegis Health, một phòng thí nghiệm nghiên cứu cho các cuộc đối thoại y khoa. 
                 Tham gia cùng hơn 450.000 thành viên trong việc giải mã tương lai của sự trường thọ thông qua dữ liệu nghiêm ngặt và đối thoại ngang hàng.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12">
              {mentalHealthData.topics.map((topic: any, idx) => (
                <TopicCard 
                  key={topic.id}
                  {...topic}
                  idx={idx}
                />
              ))}
           </div>
        </section>

        {/* Feed & Sidebar Section */}
        <section className="py-20 border-t border-slate-100">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-[60px]">
              
              {/* Main Feed (8/12) */}
              <div className="lg:col-span-8">
                 <div className="flex items-center justify-between mb-12">
                   <h2 className="text-3xl font-extrabold text-[#191c1e]">Thảo luận gần đây</h2>
                   <div className="flex bg-[#f2f4f6] p-1 rounded-lg">
                      <button className="px-6 py-2 bg-white text-[#1e3a8a] rounded-md text-xs font-bold shadow-sm">Latest</button>
                      <button className="px-6 py-2 text-slate-400 text-xs font-bold hover:text-slate-600 transition-colors">Unanswered</button>
                   </div>
                 </div>

                 <div className="space-y-12">
                   {mentalHealthData.recentDiscussions.map((post, idx) => (
                     <ArticleCard 
                       key={post.id}
                       {...post}
                       idx={idx}
                       className="p-0 border-none shadow-none rounded-none" // Landing style: no cards
                     />
                   ))}
                 </div>

                 <div className="mt-16 flex justify-center">
                    <Link href="/nutrition" className="inline-flex items-center gap-3 text-[#0056b3] font-bold text-lg hover:underline group">
                       Xem tất cả thảo luận <MoveRight className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                 </div>
              </div>

              {/* Sidebar (4/12) */}
              <div className="lg:col-span-4">
                 <MentalHealthSidebar 
                    trending={mentalHealthData.sidebar.trending}
                    cta={mentalHealthData.sidebar.cta}
                 />
              </div>

           </div>
        </section>

      </main>
    </div>
  );
}
