import { ResearchSidebar } from "@/components/research/ResearchSidebar";
import { ResearchContent } from "@/components/research/ResearchContent";
import { CommentSection } from "@/components/research/CommentSection";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import researchData from "@/mock-data/research.json";

export default function ResearchPage() {
  const { article, comments } = researchData;

  return (
    <main className="min-h-screen bg-[#f7f9fb] pt-24 pb-20">
      <div className="container mx-auto px-6 lg:px-32 flex flex-col gap-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: "Nghiên cứu"},
          ]} 
          className="mb-0" 
        />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Left Sidebar - Meta & Author Info */}
          <aside className="w-full lg:w-[320px] shrink-0 lg:sticky lg:top-36">
            <ResearchSidebar 
              author={article.author}
              lastUpdated={article.lastUpdated}
              views={article.views}
              category={article.category}
            />
          </aside>

          {/* Main Content Area */}
          <div className="flex-grow min-w-0">
            <ResearchContent 
              title={article.title}
              participants={article.participants}
              featuredImage={article.featuredImage}
              content={article.content}
              stats={article.stats}
            />

            {/* Discussion Section */}
            <CommentSection 
              comments={comments}
              totalComments={article.stats.comments}
            />
          </div>

        </div>
      </div>
    </main>
  );
}
