"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, FileText, Info } from "lucide-react";

export function CreationSidebar() {
  return (
    <aside className="flex flex-col gap-8 w-full shrink-0">
      {/* User Context Preview */}
      <div className="bg-[#eceef0] border border-slate-100 rounded-2xl p-8 flex flex-col gap-6 animate-in slide-in-from-right-4 duration-500">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white shadow-sm ring-2 ring-white">
            <Image 
              src="/assets/avatar-doctor.png" 
              alt="Dr. Nguyễn Minh" 
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[#003f87] font-bold text-lg leading-tight">Dr. Nguyễn Minh</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[#424752] text-xs font-medium">Chuyên gia tim mạch</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-[#424752]">Trạng thái</span>
            <span className="text-[#006e25] font-semibold bg-green-50 px-2 py-0.5 rounded">Sẵn sàng đăng</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-[#424752]">Thời gian đọc dự kiến</span>
            <span className="text-[#191c1e] font-semibold">-- phút</span>
          </div>
        </div>
      </div>

      {/* Posting Guidelines */}
      <div className="bg-white border border-slate-100 rounded-2xl p-8 relative overflow-hidden shadow-sm animate-in slide-in-from-right-4 duration-500 delay-150">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/30 rounded-bl-[40px] pointer-events-none" />
        
        <div className="flex items-center gap-2 mb-6">
          <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
            <FileText size={18} />
          </div>
          <h3 className="font-bold text-[#003f87] text-lg font-manrope">Hướng dẫn đăng bài</h3>
        </div>

        <ul className="space-y-5">
          <GuidelineItem 
            title="Use evidence-based information"
            desc="Sử dụng các nguồn tin cậy như PubMed, WHO hoặc các nghiên cứu lâm sàng uy tín."
          />
          <GuidelineItem 
            title="Cite sources"
            desc="Trích dẫn nguồn rõ ràng ở cuối bài viết để đảm bảo tính minh bạch."
          />
          <GuidelineItem 
            title="Maintain professional tone"
            desc="Luôn giữ thái độ chuyên nghiệp, tôn trọng ý kiến khác biệt trong cộng đồng."
          />
        </ul>
      </div>

      {/* Secondary Info Disclaimer */}
      <div className="border-l-2 border-blue-600/30 pl-6 py-2 animate-in fade-in duration-700 delay-300">
        <p className="text-[#424752] text-sm italic leading-relaxed">
          &quot;Bài viết của bạn sẽ được hiển thị ngay lập tức. Tuy nhiên, đội ngũ Aegis Health có quyền gắn thẻ &apos;Đã xác minh&apos; nếu nội dung đạt chuẩn lâm sàng cao.&quot;
        </p>
      </div>
    </aside>
  );
}

function GuidelineItem({ title, desc }: { title: string; desc: string }) {
  return (
    <li className="flex gap-3 items-start group">
      <div className="mt-1 text-blue-600 transition-transform group-hover:scale-110">
        <CheckCircle2 size={16} />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[#191c1e] text-sm font-semibold leading-tight">{title}</span>
        <span className="text-[#424752] text-[12px] leading-relaxed">{desc}</span>
      </div>
    </li>
  );
}
