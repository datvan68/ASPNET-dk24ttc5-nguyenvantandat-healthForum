import { FitnessHeader } from "@/components/fitness/FitnessHeader";
import { FeaturedPostCard } from "@/components/fitness/FeaturedPostCard";
import { FitnessPostCard } from "@/components/fitness/FitnessPostCard";
import { FitnessSidebar } from "@/components/fitness/FitnessSidebar";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import fitnessData from "@/mock-data/fitness.json";

export default function FitnessPage() {
  const { featuredPost, posts, trending, experts } = fitnessData;

  return (
    <main className="min-h-screen bg-[#f7f9fb] pt-32 pb-20">
      <div className="container mx-auto px-6 lg:px-32 flex flex-col gap-12">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: "Thể hình" }]} className="mb-0 -mt-2" />

        {/* Header Section */}
        <section>
          <FitnessHeader />
        </section>

        {/* Main Layout: Feed + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Posts Feed (Left Column) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <FeaturedPostCard {...featuredPost} />
            
            <div className="flex flex-col gap-4">
              {posts.map((post, idx) => (
                <FitnessPostCard key={post.id} {...(post as any)} idx={idx} />
              ))}
            </div>

            <button className="w-full py-4 border-2 border-[rgba(0,63,135,0.1)] rounded-xl text-[#003f87] font-bold text-sm hover:bg-white/50 transition-colors mt-4">
              Xem thêm bài viết
            </button>
          </div>

          {/* Sidebar (Right Column) */}
          <aside className="lg:col-span-4 flex flex-col gap-8">
            <FitnessSidebar trending={trending} experts={experts as any} />
          </aside>

        </div>
      </div>
    </main>
  );
}
