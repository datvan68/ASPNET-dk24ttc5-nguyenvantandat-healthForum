"use client";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#f7f9fb] font-inter">
      <div className="w-full max-w-md bg-white p-12 rounded-2xl shadow-sm">
        <h1 className="text-3xl font-bold mb-4">Quên mật khẩu?</h1>
        <p className="text-slate-500 mb-8 font-medium">Coming soon: Tính năng lấy lại mật khẩu đang được phát triển.</p>
        <Link href="/auth/login" className="text-[#003f87] font-bold hover:underline">
          Quay lại Đăng nhập
        </Link>
      </div>
    </div>
  );
}
