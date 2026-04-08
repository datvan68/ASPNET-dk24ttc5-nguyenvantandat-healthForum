"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import EditSidebar from "@/components/profile/EditSidebar";
import ProfileBannerEdit from "@/components/profile/ProfileBannerEdit";
import EditForms from "@/components/profile/EditForms";
import { getProfile } from "@/services/profile";
import { toast } from "sonner";

export default function EditProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("personal");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          router.push("/auth/login");
          return;
        }

        const parsedUser = JSON.parse(storedUser);
        if (!parsedUser.id) throw new Error("User ID missing");
        
        // Fetch fresh data from backend
        const fullProfile = await getProfile(parsedUser.id.toString());
        setUser(fullProfile);
      } catch (err: any) {
        console.error("Error fetching profile:", err);
        // Fallback to local storage if API fails (mock behavior)
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleUpdate = (updatedData: any) => {
    setUser(updatedData);
    // Sync back to local storage for header/other components
    localStorage.setItem("user", JSON.stringify(updatedData));
    // Trigger header update via custom event (if implemented in project)
    window.dispatchEvent(new Event("auth-change"));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#1e3a8a] border-t-transparent animate-spin" />
          <span className="text-slate-400 font-medium">Đang tải hồ sơ...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 flex">
        {/* Navigation Sidebar */}
        <EditSidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
          user={user}
        />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-8 pt-6">
          <div className="max-w-6xl mx-auto">
            {activeSection === "personal" ? (
              <>
                <ProfileBannerEdit user={user} />
                <EditForms user={user} onUpdate={handleUpdate} />
              </>
            ) : (
              <div className="h-[60vh] flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                  <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-[#1e3a8a] animate-spin" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Đang phát triển</h3>
                <p className="text-slate-500 text-sm">Chức năng {activeSection} sẽ sớm có mặt!</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
