"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight } from "lucide-react";

const qaSpotlights = [
  {
    id: 1,
    question: "Sử dụng Creatine Monohydrate có ảnh hưởng lâu dài đến chức năng thận không?",
    answer: "Đối với người có chức năng thận bình thường, Creatine Monohydrate là một trong những thực phẩm bổ sung được nghiên cứu kỹ lưỡng nhất và an toàn...",
    doctor: "Dr. Minh Pham",
    specialty: "Thận học",
    avatar: "/assets/avatar-minh-pham.png"
  },
  {
    id: 2,
    question: "Vitamin D3 và K2 nên uống vào thời điểm nào trong ngày để tối ưu hấp thụ?",
    answer: "Vitamin D3 và K2 đều là các vitamin tan trong chất béo, vì vậy thời điểm tốt nhất là uống trong hoặc ngay sau bữa ăn có chứa chất béo...",
    doctor: "ThS. Linh Nguyen",
    specialty: "Dược lâm sàng",
    avatar: "/assets/avatar-linh-nguyen.png"
  }
];

export function ExpertQASection() {
  return (
    <section className="container mx-auto px-6 lg:px-32 py-24 bg-white/50">
      <div className="flex justify-between items-end mb-12">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-slate-900 font-[Roboto]">
            Hỏi đáp cùng Chuyên gia
          </h2>
          <p className="text-slate-500 font-medium">
            Những thắc mắc y khoa được giải đáp bởi đội ngũ bác sĩ xác thực.
          </p>
        </div>
        <Button variant="ghost" className="text-[#003f87] font-semibold gap-2">
          Đặt câu hỏi mới <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {qaSpotlights.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-10 shadow-sm border border-[#f1f5f9] hover:shadow-md transition-shadow"
          >
            <div className="flex gap-6 mb-8">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl shrink-0 flex items-center justify-center p-2">
                <img src="/assets/qa-quote-icon.svg" alt="Q&A Icon" className="w-full h-full" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-manrope">
                {item.question}
              </h3>
            </div>

            <div className="bg-[#f2f4f6] rounded-xl p-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <img src={item.avatar} alt={item.doctor} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 -mb-0.5">
                    {item.doctor} <span className="text-[#003f87] font-normal ml-2">● {item.specialty}</span>
                  </div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Câu trả lời được xác minh</div>
                </div>
              </div>
              <p className="text-[#424752] leading-relaxed line-clamp-3">
                {item.answer}
              </p>
              <Button variant="ghost" className="text-[#003f87] font-bold p-0 flex items-center gap-2">
                Xem câu trả lời chi tiết
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
