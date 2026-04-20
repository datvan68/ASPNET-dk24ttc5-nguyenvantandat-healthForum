"use client";

import { Button } from "@/components/ui/button";
import { Share2, MessageCircle, Globe, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#020617] pt-20 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Logo & Description */}
          <div className="space-y-6">
            <div className="text-2xl font-bold text-white tracking-[-0.5px]">Clinical Atelier</div>
            <p className="text-[#94a3b8] text-sm leading-relaxed max-w-xs">
              Nền tảng kiến thức y khoa chuyên sâu dành cho cộng đồng và chuyên gia dựa trên bằng chứng lâm sàng.
            </p>
            <div className="flex gap-4 pt-2">
              <button className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Share2 className="w-4 h-4 text-white" />
              </button>
              <button className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <MessageCircle className="w-4 h-4 text-white" />
              </button>
              <button className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Globe className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Links - Cộng đồng */}
          <div className="space-y-6">
            <h4 className="text-[#d7e2ff] text-xs font-bold uppercase tracking-[1.5px]">Cộng đồng</h4>
            <ul className="space-y-4">
              <li><button className="text-[#94a3b8] text-sm hover:text-white transition-colors">Về chúng tôi</button></li>
              <li><button className="text-[#94a3b8] text-sm hover:text-white transition-colors">Đội ngũ chuyên gia</button></li>
              <li><button className="text-[#94a3b8] text-sm hover:text-white transition-colors">Hội đồng thẩm định</button></li>
            </ul>
          </div>

          {/* Links - Tài nguyên */}
          <div className="space-y-6">
            <h4 className="text-[#d7e2ff] text-xs font-bold uppercase tracking-[1.5px]">Tài nguyên</h4>
            <ul className="space-y-4">
              <li><button className="text-[#94a3b8] text-sm hover:text-white transition-colors">Thư viện tài liệu</button></li>
              <li><button className="text-[#94a3b8] text-sm hover:text-white transition-colors">Lộ trình sức khỏe</button></li>
              <li><button className="text-[#94a3b8] text-sm hover:text-white transition-colors">Nghiên cứu mới nhất</button></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-[#d7e2ff] text-xs font-bold uppercase tracking-[1.5px]">Đăng ký bản tin</h4>
            <p className="text-[#94a3b8] text-sm">Nhận cập nhật y khoa hàng tuần từ các chuyên gia.</p>
            <div className="flex h-12">
              <input 
                type="email" 
                placeholder="Email của bạn" 
                className="flex-1 bg-white/5 border border-white/10 rounded-l-lg px-4 text-sm text-white outline-none focus:border-blue-500/50 transition-all"
              />
              <button className="bg-[#003f87] hover:bg-blue-800 px-4 rounded-r-lg flex items-center justify-center transition-colors">
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
          {/* Author Info */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-[#d7e2ff] text-xs font-bold uppercase tracking-[1.5px]">Chuyên đề tốt nghiệp · Năm học 2025</p>
              <p className="text-[#94a3b8] text-sm font-medium">
                Xây dựng Website Diễn đàn Sức khoẻ — <span className="text-white font-semibold">Nguyễn Văn Tấn Đạt</span>
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-[#64748b] text-[10px] uppercase tracking-widest font-bold">MSSV</p>
                <p className="text-[#94a3b8] text-xs font-mono font-semibold">170124525</p>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div className="text-center">
                <p className="text-[#64748b] text-[10px] uppercase tracking-widest font-bold">Lớp</p>
                <p className="text-[#94a3b8] text-xs font-semibold">DK24TTC5</p>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div className="text-center">
                <p className="text-[#64748b] text-[10px] uppercase tracking-widest font-bold">Trường</p>
                <p className="text-[#94a3b8] text-xs font-semibold">ĐH Trà Vinh</p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-white/5">
            <p className="text-[#64748b] text-xs font-medium tracking-tight">
              © 2026 Clinical Atelier · GVHD: ThS. Đoàn Phước Miền · Khoa KT&CN, Trường ĐH Trà Vinh
            </p>
            <div className="flex gap-8">
              <button className="text-[#64748b] text-[10px] font-bold uppercase tracking-widest hover:text-white transition-all">Điều khoản</button>
              <button className="text-[#64748b] text-[10px] font-bold uppercase tracking-widest hover:text-white transition-all">Bảo mật</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
