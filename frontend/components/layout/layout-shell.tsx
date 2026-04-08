"use client";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { Toaster } from "sonner";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="min-h-screen pt-6">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
