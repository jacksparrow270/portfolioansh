import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import appCss from "../styles.css?url";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OrbBackground } from "@/components/OrbBackground";
import { Toaster } from "@/components/ui/sonner";

// ─── CURSOR GLOW — global, runs on every page ─────────────────────────────
function useCursorGlow() {
  useEffect(() => {
    const el = document.getElementById("cursor-glow");
    if (!el) return;

    let cx = -300, cy = -300, tx = -300, ty = -300;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX - 150;
      ty = e.clientY - 150;
    };

    function loop() {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el!.style.transform = `translate(${cx}px, ${cy}px)`;
      rafId = requestAnimationFrame(loop);
    }

    document.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass-strong max-w-md rounded-3xl p-10 text-center">
        <h1 className="text-7xl font-light text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-medium">Lost in the cosmos</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This page drifted beyond our orbit.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-primary px-5 py-2 text-sm font-medium text-primary-foreground"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "0xAnsh — Cybersecurity & Cloud" },
      {
        name: "description",
        content:
          "Ansh Khare — B.Tech Cybersecurity student. Python, Cloud computing, and offensive security.",
      },
      { name: "author", content: "Ansh Khare" },
      { property: "og:title", content: "0xAnsh — Cybersecurity & Cloud" },
      {
        property: "og:description",
        content: "B.Tech Cybersecurity student. Python, Cloud, and offensive security.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  useCursorGlow();

  return (
    <>
      {/* Cursor glow — fixed, pointer-events:none, z-index:0 */}
      <div
        id="cursor-glow"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 300,
          height: 300,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 0,
          background: "radial-gradient(circle, rgba(232,98,42,0.06) 0%, transparent 70%)",
          willChange: "transform",
        }}
      />
      <OrbBackground />
      <Header />
      <main className="relative z-10 pt-28">
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
