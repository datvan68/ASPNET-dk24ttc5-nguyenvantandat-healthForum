"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Edit3 } from "lucide-react";

interface ProfileHeroProps {
  fullName: string;
  title: string;
  specialty: string;
  avatarUrl: string;
  coverImageUrl: string;
  isVerified: boolean;
  bio: string;
  location: string;
  joinDate: string;
  locationIconUrl?: string | null; // New
  joinIconUrl?: string | null; // New
  editIconUrl?: string | null; // New
}

export function ProfileHero({
  fullName,
  title,
  specialty,
  avatarUrl,
  coverImageUrl,
  isVerified,
  bio,
  location,
  joinDate,
  locationIconUrl,
  joinIconUrl,
  editIconUrl,
}: ProfileHeroProps) {
  return (
    <section className="relative w-full pb-[64px]">
      {/* Cover Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[256px] w-full overflow-hidden rounded-lg"
      >
        <Image
          src={coverImageUrl}
          alt="Profile Cover"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(236,238,240,0)] to-[rgba(236,238,240,0.4)]" />
      </motion.div>

      {/* Profile Header Container */}
      <div className="mx-auto max-w-[1228px] px-8 -mt-16 relative flex flex-col md:flex-row gap-6 items-end">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
          className="relative size-[160px] p-1 bg-white rounded-lg shadow-[0px_10px_15px_-3px_rgba(0,63,135,0.05),0px_4px_6px_-4px_rgba(0,63,135,0.05)]"
        >
          <div className="relative size-full overflow-hidden rounded-[4px]">
            <Image
              src={avatarUrl}
              alt={fullName}
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Profile Info */}
        <div className="flex-1 pb-2 flex flex-col gap-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3"
          >
            <h1 className="text-[30px] font-['Roboto',sans-serif] text-[#191c1e] tracking-tight leading-[36px]">
              {fullName}
            </h1>
            {isVerified && (
              <div className="bg-[#80f98b] text-[#007327] flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.55px]">
                <Image src="/assets/verified_tick.png" alt="Verified" width={11} height={11} className="shrink-0 grayscale brightness-50 contrast-125" />
                <span>Người bảo trợ sức khỏe xác thực</span>
              </div>
            )}
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-[#424752] max-w-[672px] leading-[24px] text-[16px]"
          >
            {bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex gap-4 text-sm font-medium text-[#003f87] items-center pt-1"
          >
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={14} className="text-[#003f87] stroke-[3px]" />
              <span className="text-[14px]">{location}</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Calendar size={14} className="text-[#003f87] stroke-[3px]" />
              <span className="text-[14px]">Tham gia {joinDate}</span>
            </div>
          </motion.div>
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="pb-2"
        >
          <Link href="/profile/edit">
            <Button className="bg-gradient-to-r from-[#003f87] to-[#0056b3] hover:opacity-90 shadow-[0px_4px_6px_-1px_rgba(0,63,135,0.2),0px_2px_4px_-2px_rgba(0,63,135,0.2)] h-[44px] px-6 rounded-[6px] font-semibold">
              <Edit3 className="mr-2 size-[16px]" />
              Chỉnh sửa hồ sơ
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
