"use client";

import { motion } from "framer-motion";

const clusters = [
  {
    id: 1,
    title: "Dinh dưỡng lâm sàng",
    label: "Dinh dưỡng",
    description: "Phân tích chuyên sâu về chế độ ăn...",
    image: "/assets/cluster-nutrition.png",
    labelBg: "bg-[#80f98b]",
    labelText: "text-[#007327]"
  },
  {
    id: 2,
    title: "Thể hình & Cơ sinh học",
    label: "Thể hình",
    description: "Tối ưu hóa hiệu suất qua dữ liệu.",
    image: "/assets/cluster-fitness.png",
    labelBg: "bg-[#d7e2ff]",
    labelText: "text-[#001a40]"
  },
  {
    id: 3,
    title: "Sức khỏe tâm thần",
    label: "Tâm lý",
    description: "Giải pháp bền vững cho não bộ.",
    image: "/assets/cluster-mental.png",
    labelBg: "bg-[#ffdbcc]",
    labelText: "text-[#351000]"
  },
  {
    id: 4,
    title: "Nghiên cứu tuổi thọ",
    label: "Tuổi thọ",
    description: "Khám phá phương thức kéo dài...",
    image: "/assets/cluster-longevity.png",
    labelBg: "bg-[#83fc8e]",
    labelText: "text-[#002106]"
  }
];

export function KnowledgeClusters() {
  return (
    <section className="container mx-auto px-6 lg:px-32 py-12">
      <h2 className="text-3xl font-semibold text-slate-900 mb-10 font-[Roboto]">
        Cụm Tri thức Tiêu biểu
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {clusters.map((cluster, idx) => (
          <motion.div
            key={cluster.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="group relative h-[320px] rounded-2xl overflow-hidden shadow-soft cursor-pointer"
          >
            {/* Background Image */}
            <img src={cluster.image} alt={cluster.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 p-6 space-y-3">
              <span className={`px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider ${cluster.labelBg} ${cluster.labelText}`}>
                {cluster.label}
              </span>
              <h3 className="text-xl font-bold text-white font-manrope">
                {cluster.title}
              </h3>
              <p className="text-white/70 text-sm line-clamp-1">
                {cluster.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
