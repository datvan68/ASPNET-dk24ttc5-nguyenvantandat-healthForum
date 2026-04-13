"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const syncUser = () => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };

  useEffect(() => {
    // Read on mount
    syncUser();

    // Listen for auth changes from the SAME tab (custom event)
    window.addEventListener("auth-change", syncUser);
    // Listen for auth changes from OTHER tabs (native storage event)
    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("auth-change", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    setUser(null);
    setIsDropdownOpen(false);
    window.dispatchEvent(new Event("auth-change"));
    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full h-24 z-50 transition-all duration-300 backdrop-blur-md bg-white/85 shadow-sm border-b border-[#1e3a8a]/5">
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold font-inter tracking-[-1.2px] text-[#1e3a8a]">
            Clinical Atelier
          </span> 
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {[
            { label: "Dinh dưỡng", href: "/nutrition" },
            { label: "Thể hình", href: "/fitness" },
            { label: "Sức khỏe tâm thần", href: "/mental-health" },
            { label: "Bài viết", href: "/articles" }
          ].map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.label} 
                href={item.href} 
                className={cn(
                  "relative text-sm font-semibold transition-colors py-1 px-1",
                  isActive ? "text-[#003f87]" : "text-slate-500 hover:text-[#003f87]/70"
                )}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="active-nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#003f87] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Global Search & Actions */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center bg-[#e6e8ea] rounded-[12px] px-4 py-2 w-64 border border-transparent focus-within:border-blue-200 transition-all">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm kiến thức..." 
              className="bg-transparent border-none outline-none text-sm ml-3 w-full placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center border border-slate-100 shadow-sm">
                    {user.avatar ? (
                      <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <UserIcon className="w-5 h-5 text-slate-500" />
                    )}
                  </div>
                  <span className="text-sm font-semibold text-slate-700 hidden lg:block">
                    {user.fullName || user.userName}
                  </span>
                </button>

                {isDropdownOpen && (
                  <>
                    {/* Invisible overlay to close dropdown when clicking outside */}
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsDropdownOpen(false)} 
                    />
                    
                    {/* Dropdown Menu */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-3 w-48 bg-white border border-slate-100 rounded-xl shadow-lg p-2 flex flex-col z-50 overflow-hidden origin-top-right"
                    >
                      <Link 
                        href="/profile" 
                        onClick={() => setIsDropdownOpen(false)}
                        className="px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#003f87] rounded-lg font-medium transition-colors text-left flex items-center gap-2"
                      >
                        <UserIcon className="w-4 h-4" />
                        Hồ sơ của tôi
                      </Link>
                      <div className="h-px bg-slate-100 my-1 mx-2"></div>
                      <button 
                        onClick={handleLogout}
                        className="px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg font-semibold transition-colors text-left"
                      >
                        Đăng xuất
                      </button>
                    </motion.div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" className="text-slate-600 font-semibold px-4 py-2 hover:bg-slate-50">
                    Đăng nhập
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="bg-gradient-to-br from-[#003f87] to-[#0056b3] text-white px-6 py-2 h-auto text-sm font-semibold rounded-[6px]">
                    Đăng ký
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
