"use client";

import { ResearchSidebar } from "@/components/articles/ResearchSidebar";
import { ResearchContent } from "@/components/articles/ResearchContent";
import { CommentSection } from "@/components/articles/CommentSection";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import articleData from "@/mock-data/articles.json";

export default function ArticleDetailPage() {
  const { article, comments } = articleData;

  return (
    <main className="min-h-screen bg-[#f7f9fb] pt-24 pb-20">
      <div className="container mx-auto px-6 lg:px-20 max-w-[1440px] flex flex-col gap-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: "Bài viết", href: "/articles" },
            { label: article.title },
          ]} 
          className="mb-4" 
        />

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Column - Main Content Area */}
          <div className="flex-grow min-w-0">
            <ResearchContent 
              title={article.title}
              category={article.category}
              lastUpdated={article.lastUpdated}
              featuredImage={article.featuredImage}
              author={article.author}
              content={article.content}
              stats={{
                likes: article.stats.likes,
                views: article.views,
                saves: article.saves
              }}
            />

            {/* Discussion Section */}
            <CommentSection 
              comments={comments}
              totalComments={article.stats.comments}
            />
          </div>

          {/* Right Column - Sidebar */}
          <aside className="w-full lg:w-[360px] shrink-0 sticky top-36">
            <ResearchSidebar 
              author={article.author}
              relatedTopics={article.relatedTopics}
              relatedArticles={article.relatedArticles}
            />
          </aside>

        </div>
      </div>
    </main>
  );
}
