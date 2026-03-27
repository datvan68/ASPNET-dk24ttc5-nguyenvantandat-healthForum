"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileDown, ArrowRight } from "lucide-react";

const resources = [
  {
    id: 1,
    title: "Hướng dẫn Điều trị Rối loạn Lipid máu 2024",
    source: "Hội Tim mạch học Việt Nam",
    size: "4.2 MB",
    format: "PDF",
    bgColor: "bg-red-50",
    iconColor: "text-red-600"
  },
  {
    id: 2,
    title: "Báo cáo Xu hướng Y học Tái tạo Thập kỷ tới",
    source: "Whitepaper | Clinical Atelier Research",
    size: "3.8 MB",
    format: "PDF",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    id: 3,
    title: "Sổ tay Dinh dưỡng Cơ bản cho Bệnh nhân Thận",
    source: "Dr. Minh Pham | Hospital Review",
    size: "1.5 MB",
    format: "PDF",
    bgColor: "bg-green-50",
    iconColor: "text-green-600"
  },
  {
    id: 4,
    title: "Quy trình Thẩm định Sản phẩm Thực phẩm chức năng",
    source: "Regulatory Update 2024",
    size: "2.1 MB",
    format: "PDF",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600"
  }
];

export function MedicalLibrary() {
  return (
    <section className="bg-[#f2f4f6] py-24">
      <div className="container mx-auto px-6 lg:px-32">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-slate-900 font-[Roboto]">
              Thư viện Tài liệu Chuyên môn
            </h2>
            <p className="text-slate-500 font-medium">
              Báo cáo khoa học, sách trắng và nghiên cứu lâm sàng mới nhất.
            </p>
          </div>
          <Button variant="outline" className="bg-white border-slate-300 gap-2">
            Xem tất cả <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, idx) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-slate-200 h-full flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="space-y-6">
                <div className={`w-12 h-16 rounded flex items-center justify-center ${resource.bgColor}`}>
                  <FileDown className={`w-6 h-6 ${resource.iconColor}`} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 leading-tight font-manrope">
                    {resource.title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {resource.source}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {resource.size} • {resource.format}
                </span>
                <button className="text-[10px] font-bold text-[#003f87] uppercase tracking-widest hover:underline">
                  Tải về
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
