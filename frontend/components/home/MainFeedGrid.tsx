"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageSquare, Bookmark, TrendingUp, Users } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "Phân tích tác động của Magnesium Threonate đối với chất lượng giấc ngủ sâu",
    author: "Dr. Minh Pham",
    time: "12 phút trước",
    votes: 142,
    comments: 28,
    isVerified: true,
    avatar: "/assets/avatar-minh-pham.png"
  },
  {
    id: 2,
    title: "Tại sao chỉ số HbA1c quan trọng hơn đường huyết đói trong quản lý tiểu đường?",
    author: "ThS. Linh Nguyen",
    time: "1 giờ trước",
    votes: 89,
    comments: 15,
    isVerified: false,
    avatar: "/assets/avatar-linh-nguyen.png"
  }
];

export function MainFeedGrid() {
  return (
    <section className="container mx-auto px-6 lg:px-32 py-12 grid grid-cols-12 gap-10">
      
      {/* Left Feed Column */}
      <div className="col-span-12 lg:col-span-8 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold text-slate-900 font-[Roboto]">
            Thảo luận mới nhất
          </h2>
          <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
            <Button variant="ghost" size="sm" className="bg-white shadow-sm text-[#003f87]">Phổ biến</Button>
            <Button variant="ghost" size="sm" className="text-slate-500">Mới nhất</Button>
          </div>
        </div>

        <div className="space-y-4">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-[#f8fafc] shadow-soft hover:border-blue-100 transition-colors"
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                  <img src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[#003f87] text-sm">{post.author}</span>
                      {post.isVerified && (
                        <span className="bg-[#80f98b] text-[#007327] text-[8px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase">
                          Chuyên gia xác thực
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400">{post.time}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-manrope leading-snug">
                    {post.title}
                  </h3>
                  <div className="flex gap-6 items-center text-slate-400">
                    <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                      <img src="/assets/icon-thumbs-up.svg" alt="Upvote" className="w-4 h-4" /> <span className="text-sm font-medium">{post.votes}</span>
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                      <img src="/assets/icon-comments.svg" alt="Comments" className="w-4 h-4" /> <span className="text-sm font-medium">{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-1.5 ml-auto hover:text-yellow-600 transition-colors">
                      <img src="/assets/icon-bookmark.svg" alt="Save" className="w-4 h-4" /> <span className="text-sm font-medium">Lưu</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          <Button variant="outline" className="w-full py-6 rounded-xl border-slate-300 text-[#003f87] gap-2">
            Tải thêm thảo luận
            <img src="/assets/icon-chevron-down.svg" alt="Chevron" className="w-3 h-2" />
          </Button>
        </div>
      </div>

      {/* Right Sidebar Column */}
      <aside className="col-span-12 lg:col-span-4 space-y-8">
        {/* Trending Widget */}
        <div className="bg-[#f2f4f6] rounded-2xl p-8 space-y-6">
          <div className="flex items-center gap-2 text-slate-900">
            <img src="/assets/icon-trending.svg" alt="Trending" className="w-5 h-3" />
            <h3 className="text-lg font-bold font-[Roboto]">Đang là xu hướng</h3>
          </div>
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Nghiên cứu mới</span>
              <p className="font-bold text-slate-900 leading-tight">Lợi ích của Fasting 16/8 đối với quá trình Autophagy...</p>
              <span className="text-xs text-slate-500">4.2k người đang đọc</span>
            </div>
            <hr className="border-slate-200" />
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Dược lý học</span>
              <p className="font-bold text-slate-900 leading-tight">Cập nhật hướng dẫn sử dụng kháng sinh 2024</p>
              <span className="text-xs text-slate-500">2.8k người đang đọc</span>
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <div className="bg-[#003f87] rounded-2xl p-8 relative overflow-hidden shadow-lg shadow-blue-900/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-2xl rounded-full" />
          <h3 className="text-2xl font-bold text-white mb-4 leading-tight font-manrope">
            Gia nhập Hội đồng đánh giá
          </h3>
          <p className="text-white/80 text-sm mb-6 leading-relaxed">
            Tham gia thẩm định nội dung để bảo vệ tính chính xác y khoa của cộng đồng.
          </p>
          <Button className="w-full bg-white text-[#003f87] font-bold py-6 hover:bg-white/90">
            Đăng ký chuyên gia
          </Button>
        </div>

        {/* Experts Online */}
        <div className="p-4 space-y-4">
          <h4 className="text-[12px] uppercase font-bold text-slate-400 tracking-[1.2px]">Chuyên gia trực tuyến</h4>
          <div className="flex items-center -space-x-2">
            <div className="w-10 h-10 rounded-xl border-2 border-green-500 overflow-hidden bg-white">
              <img src="/assets/avatar-expert-1.png" alt="Expert" className="w-full h-full object-cover" />
            </div>
            <div className="w-10 h-10 rounded-xl border-2 border-green-500 overflow-hidden bg-white">
              <img src="/assets/avatar-expert-2.png" alt="Expert" className="w-full h-full object-cover" />
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[12px] font-bold text-slate-500">
              +24
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
}
