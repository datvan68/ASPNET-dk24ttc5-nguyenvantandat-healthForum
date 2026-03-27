import type { Metadata } from "next";
import "@/app/globals.css";
import { LayoutShell } from "@/components/layout/layout-shell";

export const metadata: Metadata = {
  title: "Health Forum",
  description: "Starter project for a health forum platform.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="antialiased">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
