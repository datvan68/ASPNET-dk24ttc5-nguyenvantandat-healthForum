"use client";

import { User, Award, Shield, Bell, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { id: "personal", label: "Thông tin cá nhân", icon: User },
  { id: "certs", label: "Chứng chỉ", icon: Award },
  { id: "security", label: "Bảo mật", icon: Shield },
  { id: "notifications", label: "Thông báo", icon: Bell },
  { id: "privacy", label: "Riêng tư", icon: Lock },
];

interface EditSidebarProps {
  activeSection: string;
  onSectionChange: (id: string) => void;
  user: {
    fullName: string;
    avatarUrl?: string;
    title: string;
  } | null;
}

export default function EditSidebar({ activeSection, onSectionChange, user }: EditSidebarProps) {
  return (
    <aside className="w-64 border-r border-slate-200/50 bg-white/50 backdrop-blur-sm h-[calc(100vh-6rem)] flex flex-col pt-6 sticky top-24 overflow-y-auto">
      {/* User Mini Profile */}
      <div className="px-6 pb-8 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.fullName} className="w-full h-full object-cover" />
            ) : (
              <User className="w-5 h-5 text-slate-500 m-auto mt-2" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[#1e3a8a]">{user?.fullName || "Dr. Aris"}</span>
            <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">{user?.title || "Verified Professional"}</span>
          </div>
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200",
                isActive 
                  ? "bg-white text-[#1e3a8a] font-semibold shadow-sm border border-slate-100" 
                  : "text-slate-600 hover:bg-slate-50 font-medium"
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-[#1e3a8a]" : "text-slate-400")} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
