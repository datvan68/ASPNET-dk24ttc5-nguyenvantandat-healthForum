import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";

const stack = [
  "Next.js App Router",
  "Tailwind CSS setup",
  "ASP.NET backend ready",
  "SQL scripts scaffold",
];

export default function HomePage() {
  return (
    <Container className="py-20">
      <section className="overflow-hidden rounded-[32px] border border-white/80 bg-white/80 bg-mesh-glow p-8 shadow-soft backdrop-blur md:p-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_0.8fr] md:items-center">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-4 py-1 text-sm font-semibold text-brand-700">
              Health Forum starter
            </span>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
                Project structure is ready for frontend, backend, and database.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                Use this screen as the starting point to build authentication,
                medical topics, expert Q&amp;A, and moderation workflows.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="http://localhost:8080/api/health">Backend API</Button>
              <Button
                href="https://www.figma.com/"
                variant="secondary"
              >
                Figma MCP ready
              </Button>
            </div>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-slate-950 p-6 text-white shadow-soft">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300/80">
              Included
            </p>
            <ul className="mt-4 space-y-3">
              {stack.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Container>
  );
}
