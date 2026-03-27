"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Cơ chế Autophagy: Từ Nghiên cứu Nobel đến Ứng dụng Lâm sàng",
    time: "20:00 - 21:30 (GMT+7)",
    date: { day: 15, month: "Tháng 12" },
    type: "Trực tiếp",
    statusColor: "bg-[#ba1a1a]",
    image: "/assets/event-1.png"
  },
  {
    id: 2,
    title: "Y học Chính xác trong Điều trị Ung thư: Thách thức & Triển vọng",
    time: "09:00 - 11:00 (GMT+7)",
    date: { day: 22, month: "Tháng 12" },
    type: "Sắp diễn ra",
    statusColor: "bg-[#0f172a]",
    image: "/assets/event-2.png"
  },
  {
    id: 3,
    title: "Diễn đàn Dinh dưỡng: Cập nhật Hướng dẫn ESPEN 2024",
    time: "14:00 - 16:30 (GMT+7)",
    date: { day: 5, month: "Tháng 01" },
    type: "Sắp diễn ra",
    statusColor: "bg-[#0f172a]",
    image: "/assets/event-3.png"
  }
];

export function MedicalEventsSection() {
  return (
    <section className="container mx-auto px-6 lg:px-32 py-24 bg-white overflow-hidden">
      <div className="flex justify-between items-end mb-12">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-slate-900 font-[Roboto]">
            Sự kiện Y khoa & Hội thảo Webinar
          </h2>
          <p className="text-slate-500 font-medium max-w-xl">
            Cập nhật kiến năng chuyên môn thông qua các buổi học thảo tương tác cùng các chuyên gia đầu ngành.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="p-3 bg-slate-50 border border-slate-200 rounded-full hover:bg-slate-100 transition-colors">
            <ChevronLeft className="w-5 h-5 text-slate-900" />
          </button>
          <button className="p-3 bg-slate-50 border border-slate-200 rounded-full hover:bg-slate-100 transition-colors">
            <ChevronRight className="w-5 h-5 text-slate-900" />
          </button>
        </div>
      </div>

      <div className="relative">
        <motion.div 
          drag="x"
          dragConstraints={{ left: -600, right: 0 }}
          className="flex gap-8 cursor-grab active:cursor-grabbing"
        >
          {events.map((event) => (
            <motion.div
              key={event.id}
              className="min-w-[420px] bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-soft group shrink-0"
            >
              {/* Image Area */}
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className={`absolute top-4 left-4 flex gap-1.5 items-center px-2 py-1 rounded-[2px] ${event.statusColor}`}>
                  {event.type === "Trực tiếp" && (
                     <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  )}
                  <span className="text-[10px] uppercase font-bold text-white tracking-widest">
                    {event.type}
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center shrink-0 w-12 pt-1 border-r border-slate-100 pr-4">
                    <span className="text-[#003f87] text-2xl font-bold leading-none">{event.date.day}</span>
                    <span className="text-[#727784] text-[10px] font-bold uppercase tracking-wider">{event.date.month}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-manrope leading-tight line-clamp-2 min-h-[44px]">
                    {event.title}
                  </h3>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                   <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                      <Clock className="w-4 h-4" />
                      {event.time}
                   </div>
                   <Button variant="ghost" className="text-[#003f87] font-bold p-0 text-xs">
                     Đặt chỗ trước
                   </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
