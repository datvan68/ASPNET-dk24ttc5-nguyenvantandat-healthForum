"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HomeHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0f172a] py-20 lg:py-32">
      {/* Background Image/Overlay */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <img 
          src="/assets/hero-bg-home.png" 
          alt="Medical Research Lab"
          className="w-full h-full object-cover scale-150 transform -translate-y-1/4"
        />
      </div>

      <div className="container relative z-10 px-6 lg:px-12 grid gap-8 lg:max-w-4xl">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-md w-fit"
        >
          <div className="h-3 w-3 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-[12px] font-semibold text-white tracking-[1.2px] uppercase">
            Nền tảng tri thức y khoa
          </span>
        </motion.div>

        {/* Animated Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-semibold tracking-[-1.8px] text-white leading-tight font-[Roboto]">
            Hệ sinh thái <br /> Tri thức Sức khỏe
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed font-medium"
        >
          Nơi hội tụ các cuộc thảo luận y khoa dựa trên bằng chứng, kết nối chuyên gia và cộng đồng trong một không gian lâm sàng chuẩn mực.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-4 pt-4"
        >
          <Button 
            className="bg-gradient-to-br from-[#003f87] to-[#0056b3] text-white px-8 py-6 text-lg hover:shadow-lg hover:shadow-blue-500/20"
          >
            Khám phá thảo luận
          </Button>
          <Button 
            variant="outline" 
            className="border-white/30 bg-white/10 text-white backdrop-blur-md px-8 py-6 text-lg hover:bg-white/20"
          >
            Xem Nghiên cứu mới
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
