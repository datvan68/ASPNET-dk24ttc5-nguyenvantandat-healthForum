"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, UserCheck } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "458k",
    label: "Thành viên",
    bgColor: "bg-[#003f87]/10",
    textColor: "text-[#003f87]"
  },
  {
    icon: BookOpen,
    value: "1.2m",
    label: "Bài viết",
    bgColor: "bg-[#006e25]/10",
    textColor: "text-[#006e25]"
  },
  {
    icon: UserCheck,
    value: "89%",
    label: "Chuyên gia xác thực",
    bgColor: "bg-[#983c00]/10",
    textColor: "text-[#722b00]"
  }
];

export function StatsSection() {
  return (
    <div className="container mx-auto px-6 lg:px-32 -mt-16 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="bg-white rounded-2xl p-8 flex items-center gap-6 shadow-soft border border-[#f2f4f6]"
          >
            <div className={`p-4 rounded-xl ${stat.bgColor}`}>
              <stat.icon className={`w-8 h-8 ${stat.textColor}`} />
            </div>
            <div>
              <div className={`text-3xl font-semibold font-inter ${stat.textColor}`}>
                {stat.value}
              </div>
              <div className="text-sm font-semibold tracking-[0.7px] uppercase text-[#727784] mt-1">
                {stat.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
