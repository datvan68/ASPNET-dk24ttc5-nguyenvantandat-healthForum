"use client";

import { Camera, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ProfileBannerEditProps {
  user: {
    fullName: string;
    avatarUrl?: string;
    coverImageUrl?: string;
    specialty: string;
    isVerified: boolean;
  } | null;
}

export default function ProfileBannerEdit({ user }: ProfileBannerEditProps) {
  const [hoverCover, setHoverCover] = useState(false);
  const [hoverAvatar, setHoverAvatar] = useState(false);

  return (
    <section className="relative w-full mb-12 group/banner">
      {/* Cover Image */}
      <div 
        className="relative h-48 w-full rounded-xl overflow-hidden bg-slate-100/50 shadow-inner group/cover"
        onMouseEnter={() => setHoverCover(true)}
        onMouseLeave={() => setHoverCover(false)}
      >
        <img 
          src={user?.coverImageUrl || "/assets/avatar-doctor.png"} 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        
        {/* Cover Overlay */}
        <AnimatePresence>
          {hoverCover && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 flex items-center justify-center cursor-pointer"
            >
              <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg border border-white/50">
                <Camera className="w-4 h-4 text-slate-800" />
                <span className="text-sm font-semibold text-slate-900">Thay đổi ảnh bìa</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Avatar Section */}
      <div className="absolute -bottom-6 left-8 flex items-end gap-6 isolate">
        <div 
          className="relative group/avatar cursor-pointer"
          onMouseEnter={() => setHoverAvatar(true)}
          onMouseLeave={() => setHoverAvatar(false)}
        >
          <div className="w-32 h-32 rounded-[12px] bg-white p-1 shadow-[0_20px_25px_-5px_theme(colors.black/0.1),0_8px_10px_-6px_theme(colors.black/0.1)]">
            <div className="w-full h-full overflow-hidden rounded-[8px]">
              <img 
                src={user?.avatarUrl || "http://localhost:3845/assets/f8252123aafbd3e14e03858f8893a98097356e7e.png"} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Avatar Overlay */}
          <AnimatePresence>
            {hoverAvatar && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-1 bg-black/40 rounded-[8px] flex items-center justify-center"
              >
                <Camera className="w-6 h-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Info Overlay */}
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-white drop-shadow-md mb-1">{user?.fullName || "Dr. Aris"}</h2>
          {user?.isVerified && (
            <div className="bg-[#80f98b] px-2 py-0.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
              <CheckCircle2 className="w-3 h-3 text-[#007327]" />
              <span className="text-[10px] font-bold text-[#007327] uppercase tracking-wider">Verified Professional</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
