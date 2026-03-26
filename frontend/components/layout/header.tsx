import Link from "next/link";
import { Container } from "@/components/shared/container";

export function Header() {
  return (
    <header className="border-b border-slate-200/80 bg-white/70 backdrop-blur">
      <Container className="flex items-center justify-between py-5">
        <Link href="/" className="text-lg font-black tracking-tight text-slate-900">
          Health Forum
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/">Home</Link>
          <Link href="http://localhost:8080/api/health">API</Link>
        </nav>
      </Container>
    </header>
  );
}
