"use client";

import { UserCircle, Briefcase, MapPin, AlignLeft, GraduationCap, Building2, PlusCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { updateProfile } from "@/services/profile";
import { toast } from "sonner";

interface EditFormsProps {
  user: any;
  onUpdate: (updatedData: any) => void;
}

export default function EditForms({ user, onUpdate }: EditFormsProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    title: user?.title || "",
    location: user?.location || "",
    bio: user?.bio || "",
    researchArea: user?.researchArea || "",
    highestDegree: user?.highestDegree || "",
    organization: user?.organization || "",
    specialty: user?.specialty || ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!user?.id) throw new Error("User ID not found");
      
      const payload = {
        ...formData,
        siteTitle: formData.specialty // Mapping for consistent backend schema
      };

      await updateProfile(user.id.toString(), payload as any);
      toast.success("Thay đổi đã được lưu thành công!");
      onUpdate({ ...user, ...formData });
    } catch (err: any) {
      toast.error(err.message || "Không thể lưu thay đổi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-[1200px] mx-auto pb-12">
      {/* Header with Save Button */}
      <div className="lg:col-span-12 flex items-center justify-between mb-2">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">Chỉnh sửa hồ sơ</h1>
          <p className="text-sm text-slate-500">Quản lý thông tin công khai và chuyên môn của bạn tại Aegis.</p>
        </div>
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="bg-gradient-to-br from-[#003f87] to-[#0056b3] text-white px-8 py-2.5 rounded-lg font-semibold shadow-[0_4px_6px_-1px_rgba(30,63,138,0.1)] hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </div>

      {/* Left Column: Basic Info */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
            <UserCircle className="w-5 h-5 text-[#1e3a8a]" />
            <h3 className="text-lg font-bold text-slate-800">Thông tin cơ bản</h3>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Họ và tên</label>
              <input 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="bg-[#f2f4f6] px-4 py-3 rounded-lg text-sm text-slate-700 font-medium border-0 focus:ring-2 focus:ring-[#003f87]/10 transition-all" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Chức danh</label>
              <input 
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="bg-[#f2f4f6] px-4 py-3 rounded-lg text-sm text-slate-700 font-medium border-0 focus:ring-2 focus:ring-[#003f87]/10 transition-all" 
              />
            </div>
            <div className="col-span-2 flex flex-col gap-2 relative">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Địa điểm</label>
              <div className="relative group">
                <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-[#1e3a8a] transition-colors" />
                <input 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="bg-[#f2f4f6] w-full pl-10 pr-4 py-3 rounded-lg text-sm text-slate-700 font-medium border-0 focus:ring-2 focus:ring-[#003f87]/10 transition-all" 
                />
              </div>
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Giới thiệu bản thân</label>
              <textarea 
                name="bio"
                rows={4}
                value={formData.bio}
                onChange={handleChange}
                className="bg-[#f2f4f6] px-4 py-3 rounded-lg text-sm text-slate-700 font-medium border-0 focus:ring-2 focus:ring-[#003f87]/10 transition-all resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Professional Details */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
            <Briefcase className="w-5 h-5 text-[#1e3a8a]" />
            <h3 className="text-lg font-bold text-slate-800">Chuyên môn</h3>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Lĩnh vực nghiên cứu</label>
              <select 
                name="researchArea"
                value={formData.researchArea}
                onChange={handleChange as any}
                className="bg-[#f2f4f6] px-4 py-3 rounded-lg text-sm text-slate-700 font-medium border-0 focus:ring-2 focus:ring-[#003f87]/10 transition-all appearance-none cursor-pointer"
              >
                <option value="Sinh học phân tử">Sinh học phân tử</option>
                <option value="Y học lâm sàng">Y học lâm sàng</option>
                <option value="Thần kinh học">Thần kinh học</option>
                <option value="Dược học">Dược học</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Bằng cấp cao nhất</label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                <input 
                  name="highestDegree"
                  value={formData.highestDegree}
                  onChange={handleChange}
                  className="bg-[#f2f4f6] w-full pl-10 pr-4 py-3 rounded-lg text-sm text-slate-700 font-medium border-0 focus:ring-2 focus:ring-[#003f87]/10 transition-all" 
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Đơn vị công tác</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                <input 
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="bg-[#f2f4f6] w-full pl-10 pr-4 py-3 rounded-lg text-sm text-slate-700 font-medium border-0 focus:ring-2 focus:ring-[#003f87]/10 transition-all" 
                />
              </div>
            </div>
            <button className="w-full border-2 border-slate-100 border-dashed py-4 rounded-lg flex items-center justify-center gap-2 text-slate-400 hover:text-[#1e3a8a] hover:bg-slate-50 transition-all group">
              <PlusCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold">Thêm chứng chỉ khác</span>
            </button>
          </div>
        </div>

        {/* Informational Card */}
        <div className="bg-[#003f87]/[0.03] border border-[#003f87]/10 rounded-xl p-6 flex gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-[#003f87]/5 flex items-center justify-center shrink-0">
             <CheckCircle2 className="w-5 h-5 text-[#003f87]" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#003f87]">Xác minh danh tính</h4>
            <p className="text-[13px] text-[#424752] leading-relaxed font-medium">
              Hồ sơ chuyên gia cần được xác minh để nhận huy hiệu tích xanh. Các thay đổi về bằng cấp sẽ được đội ngũ Aegis duyệt trong vòng 24h.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
