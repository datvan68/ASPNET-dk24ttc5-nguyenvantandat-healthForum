"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle2 } from "lucide-react";

export function HealthRoadmapSection() {
  return (
    <section className="container mx-auto px-6 lg:px-32 py-24">
      <div className="bg-[#0056b3]/10 rounded-[32px] overflow-hidden p-10 lg:p-20 relative flex flex-col lg:flex-row items-center gap-16 border border-blue-100">
        
        {/* Visual Element */}
        <div className="absolute right-[-10%] bottom-[-20%] w-[500px] h-[500px] bg-blue-200/20 blur-3xl rounded-full" />

        <div className="flex-1 space-y-8 relative z-10">
          <h2 className="text-4xl font-semibold text-[#003f87] font-[Roboto]">
            Lộ trình Sức khỏe cá nhân hóa
          </h2>
          <p className="text-lg text-[#424752] max-w-xl font-medium leading-relaxed">
            Sử dụng công cụ đánh giá lâm sàng của chúng tôi để nhận các khuyến nghị về dinh dưỡng và luyện tập dựa trên chỉ số sinh học của riêng bạn.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button className="bg-[#003f87] hover:bg-blue-800 text-white px-10 py-6 rounded-lg text-lg">
              Bắt đầu Đánh giá
            </Button>
            <Button variant="outline" className="border-[#003f87] text-[#003f87] px-10 py-6 rounded-lg text-lg">
              Tìm hiểu phương pháp
            </Button>
          </div>
        </div>

        {/* Assessment Card Representation */}
        <div className="flex-1 relative perspective-1000">
          <motion.div
            initial={{ rotate: 5, y: 20 }}
            whileInView={{ rotate: 3, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="bg-white rounded-3xl p-8 shadow-[0px_20px_25px_-5px_rgba(30,58,138,0.1)] border border-blue-50 relative z-20 max-w-[320px] mx-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] uppercase tracking-[1.5px] font-semibold text-[#727784]">
                Báo cáo sức khỏe
              </span>
              <FileText className="w-5 h-5 text-blue-500" />
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "78%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-blue-600 rounded-full"
                  />
                </div>
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-900">Chỉ số Phục hồi</span>
                  <span className="text-blue-600">78%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#f8fafc] p-4 rounded-xl border border-slate-50">
                  <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Dinh dưỡng</div>
                  <div className="text-sm font-bold text-slate-900 flex items-center gap-1">
                    Tối ưu <CheckCircle2 className="w-3 h-3 text-green-500" />
                  </div>
                </div>
                <div className="bg-[#f8fafc] p-4 rounded-xl border border-slate-50">
                  <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Giấc ngủ</div>
                  <div className="text-xs font-bold text-red-600">Cần cải thiện</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
