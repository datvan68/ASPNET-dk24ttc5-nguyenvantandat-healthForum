import { HomeHero } from "@/components/home/HomeHero";
import { StatsSection } from "@/components/home/StatsSection";
import { HealthRoadmapSection } from "@/components/home/HealthRoadmapSection";
import { ExpertQASection } from "@/components/home/ExpertQASection";
import { KnowledgeClusters } from "@/components/home/KnowledgeClusters";
import { MainFeedGrid } from "@/components/home/MainFeedGrid";
import { MedicalLibrary } from "@/components/home/MedicalLibrary";
import { MedicalEventsSection } from "@/components/home/MedicalEventsSection";
import { TrustPartnersSection } from "@/components/home/TrustPartnersSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f9fb] pb-0">
      <HomeHero />
      <StatsSection />
      
      <div className="space-y-24">
        <HealthRoadmapSection />
        <ExpertQASection />
        <KnowledgeClusters />
        <MainFeedGrid />
        <MedicalLibrary />
        <MedicalEventsSection />
        <TrustPartnersSection />
      </div>
    </main>
  );
}
