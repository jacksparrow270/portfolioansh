import { createFileRoute } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import type { MouseEvent } from "react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — 0xAnsh" },
      {
        name: "description",
        content: "Cloud security and Python projects by Ansh Khare.",
      },
      { property: "og:title", content: "Projects — 0xAnsh" },
      {
        property: "og:description",
        content: "Cloud security and Python projects by Ansh Khare.",
      },
    ],
  }),
  component: ProjectsPage,
});

// ─── DATA ─────────────────────────────────────────────────────────────────
const projects = [
  {
    featured: true,
    category: "cloud security",
    title: "CloudHoneypot",
    desc: "Provisioned a public-facing EC2 instance running T-Pot. Configured CloudWatch log ingestion and built a Python script to parse attacker TTPs and generate geo-IP reports from raw honeypot data.",
    tech: ["AWS", "EC2", "CloudWatch", "Docker", "Python"],
  },
  {
    featured: false,
    category: "network security",
    title: "NetSentinel",
    desc: "Packet capture tool built with Python and Scapy. Detects port scans, ARP spoofing, and unusual traffic volumes. Runs on a local Linux VM and outputs structured JSON alerts.",
    tech: ["Python", "Scapy", "Linux", "JSON"],
  },
  {
    featured: false,
    category: "secure development",
    title: "FlaskVault",
    desc: "REST API built with Flask and SQLite. Implements parameterised queries, JWT authentication, rate limiting, and OWASP Top-10 mitigations. Built as a reference for secure API design.",
    tech: ["Python", "Flask", "SQLite", "JWT"],
  },
  {
    featured: false,
    category: "security tooling",
    title: "WebAuditKit",
    desc: "CLI tool that orchestrates Nmap, Nikto, and Gobuster into a single recon workflow. Outputs structured Markdown pentest reports. Written in Bash with a Python post-processor.",
    tech: ["Bash", "Python", "Nmap", "Nikto"],
  },
] as const;

// ─── REVEAL ───────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ─── TILT CARD ─────────────────────────────────────────────────────────────
function TiltCard({ children, index }: { children: React.ReactNode; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-40, 40], [5, -5]), { stiffness: 200, damping: 24 });
  const rotateY = useSpring(useTransform(x, [-40, 40], [-5, 5]), { stiffness: 200, damping: 24 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      className="reveal"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.45, ease: "easeOut" }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        animationDelay: `${index * 80}ms`,
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}

// ─── CARD ──────────────────────────────────────────────────────────────────
function ProjectCard({ p, index }: { p: (typeof projects)[number]; index: number }) {
  const isFeatured = p.featured;

  const handleEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.style.border = "var(--border-hover)";
    el.style.borderTop = "2px solid var(--accent)";
    el.style.boxShadow = "0 0 0 1px rgba(255,255,255,0.03)";
  };
  const handleLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.style.border = "var(--border-default)";
    el.style.borderTop = isFeatured
      ? "1px solid rgba(232,98,42,0.4)"
      : "var(--border-default)";
    el.style.boxShadow = "none";
  };

  return (
    <TiltCard index={index}>
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        style={{
          display: "block",
          textDecoration: "none",
          background: "var(--bg-card)",
          border: "var(--border-default)",
          borderTop: isFeatured
            ? "1px solid rgba(232,98,42,0.4)"
            : "var(--border-default)",
          borderRadius: "var(--radius-card)",
          padding: 28,
          transition: "border 0.2s ease, box-shadow 0.2s ease",
          height: "100%",
        }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {/* Featured pill */}
        {isFeatured && (
          <div style={{ marginBottom: 16 }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: "var(--accent)",
                border: "1px solid var(--accent-dim)",
                borderRadius: 4,
                padding: "2px 8px",
                display: "inline-block",
              }}
            >
              Featured
            </span>
          </div>
        )}

        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div style={{ flex: 1 }}>
            {/* Category eyebrow */}
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: "var(--text-muted)",
                margin: "0 0 10px",
                textTransform: "lowercase",
              }}
            >
              {p.category}
            </p>
            {/* Card title — Inter 600 20px, NOT Syne */}
            <h3
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: 20,
                color: "var(--text-primary)",
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              {p.title}
            </h3>
          </div>
          {/* Arrow button */}
          <div className="card-arrow" style={{ marginTop: 2 }}>
            <ArrowUpRight size={14} />
          </div>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 15,
            lineHeight: 1.6,
            color: "var(--text-secondary)",
            margin: "20px 0 0",
          }}
        >
          {p.desc}
        </p>

        {/* Tech tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 24 }}>
          {p.tech.map((t) => (
            <span key={t} className="tag-pill">{t}</span>
          ))}
        </div>

        {/* View case link */}
        <div
          style={{
            marginTop: 28,
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 13,
            color: "var(--text-secondary)",
          }}
        >
          View case <ArrowUpRight size={12} />
        </div>
      </a>
    </TiltCard>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────
function ProjectsPage() {
  useReveal();

  return (
    <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 24px 80px" }}>
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: 64 }}
      >
        <div className="eyebrow" style={{ marginBottom: 16 }}>
          <span className="eyebrow-dot" />
          selected work
        </div>
        <h1
          style={{
            fontFamily: "'Syne', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(40px, 5vw, 64px)",
            color: "var(--text-primary)",
            margin: "0 0 16px",
            lineHeight: 1.08,
          }}
        >
          Projects that{" "}
          <span style={{ color: "var(--accent)", fontStyle: "italic" }}>move the needle</span>.
        </h1>
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 15,
            lineHeight: 1.65,
            color: "var(--text-secondary)",
            maxWidth: 560,
            margin: 0,
          }}
        >
          A curated set of cloud infrastructure, security tooling, and Python engineering
          — each built to solve a real problem.
        </p>
      </motion.div>

      {/* Grid — 2 col, featured card spans full width on its own row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: 24,
        }}
      >
        {/* Featured (index 0) spans full width */}
        <div style={{ gridColumn: "1 / -1" }}>
          <ProjectCard p={projects[0]} index={0} />
        </div>
        {/* Rest in 2-col grid */}
        {projects.slice(1).map((p, i) => (
          <ProjectCard key={p.title} p={p} index={i + 1} />
        ))}
      </div>
    </div>
  );
}
