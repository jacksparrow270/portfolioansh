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
const featuredProject = {
  category: "cloud security",
  title: "CloudHoneypot",
  desc: "Provisioned a public-facing EC2 instance running T-Pot. Configured CloudWatch log ingestion and built a Python script to parse attacker TTPs and generate geo-IP reports from raw honeypot data.",
  tech: ["AWS", "EC2", "CloudWatch", "Docker", "Python"],
  github: "https://github.com/anshkhare",
};

const smallProjects = [
  {
    category: "network security",
    title: "NetSentinel",
    status: "Python · Local VM",
    desc: "Packet capture tool built with Python and Scapy. Detects port scans, ARP spoofing, and unusual traffic volumes. Runs on a local Linux VM and outputs structured JSON alerts.",
    tech: ["Python", "Scapy", "Linux", "JSON"],
  },
  {
    category: "secure development",
    title: "FlaskVault",
    status: "Flask · SQLite",
    desc: "REST API built with Flask and SQLite. Implements parameterised queries, JWT authentication, rate limiting, and OWASP Top-10 mitigations. Built as a reference for secure API design.",
    tech: ["Python", "Flask", "SQLite", "JWT"],
  },
  {
    category: "security tooling",
    title: "WebAuditKit",
    status: "Bash · CLI",
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
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}

// Terminal line colors
const terminalLines = [
  { text: "$ python3 honeypot_parser.py --output geo", type: "prompt" },
  { text: "[+] CloudWatch log stream connected", type: "info" },
  { text: "[+] Parsing 847 raw events...", type: "info" },
  { text: "[→] Unique IPs flagged: 412", type: "arrow" },
  { text: "[→] Top TTP: SSH brute-force (T1110)", type: "arrow" },
  { text: "[→] Top origin: CN, RU, NL", type: "arrow" },
  { text: "[✓] Report saved to /reports/2026-04.json", type: "success" },
];

function lineColor(type: string) {
  if (type === "prompt") return "var(--accent)";
  if (type === "info") return "rgba(255,255,255,0.5)";
  if (type === "arrow") return "rgba(255,255,255,0.35)";
  if (type === "success") return "#4EAA25";
  return "rgba(255,255,255,0.5)";
}

// ─── PAGE ──────────────────────────────────────────────────────────────────
function ProjectsPage() {
  useReveal();

  return (
    <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 24px 80px" }}>
      {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: 64, textAlign: "center" }}
      >
        <div className="eyebrow" style={{ marginBottom: 16, justifyContent: "center" }}>
          <span className="eyebrow-dot" />
          selected work
        </div>
        <h1
          style={{
            fontFamily: "'Syne', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(40px, 5vw, 56px)",
            color: "var(--text-primary)",
            margin: "0 0 16px",
            lineHeight: 1.08,
          }}
        >
          Work that{" "}
          <span style={{ color: "var(--accent)" }}>ships.</span>
        </h1>
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 16,
            lineHeight: 1.65,
            color: "var(--text-secondary)",
            maxWidth: 520,
            margin: "0 auto",
          }}
        >
          Cloud infrastructure, security tooling, and Python — built to solve real problems.
        </p>
      </motion.div>

      {/* ── FEATURED PROJECT CARD ─────────────────────────────────────────── */}
      <motion.div
        className="reveal"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          display: "grid",
          gridTemplateColumns: "55% 45%",
          gap: 0,
          background: "var(--bg-card)",
          border: "var(--border-default)",
          borderTop: "1px solid rgba(232,98,42,0.4)",
          borderRadius: "var(--radius-card)",
          overflow: "hidden",
          marginBottom: 24,
          transition: "border 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.border = "var(--border-hover)";
          el.style.borderTop = "2px solid var(--accent)";
          el.style.boxShadow = "0 0 0 1px rgba(255,255,255,0.03)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.border = "var(--border-default)";
          el.style.borderTop = "1px solid rgba(232,98,42,0.4)";
          el.style.boxShadow = "none";
        }}
      >
        {/* LEFT column */}
        <div style={{ padding: 32 }}>
          {/* Featured pill */}
          <div style={{ marginBottom: 16 }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: "var(--accent)",
                border: "1px solid rgba(232,98,42,0.35)",
                borderRadius: 4,
                padding: "2px 8px",
                display: "inline-block",
              }}
            >
              Featured
            </span>
          </div>
          {/* Category */}
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "var(--text-muted)",
              margin: "0 0 10px",
              textTransform: "lowercase",
            }}
          >
            {featuredProject.category}
          </p>
          {/* Title */}
          <h2
            style={{
              fontFamily: "'Syne', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 32,
              color: "var(--text-primary)",
              margin: "0 0 16px",
              lineHeight: 1.2,
            }}
          >
            {featuredProject.title}
          </h2>
          {/* Description */}
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 15,
              lineHeight: 1.65,
              color: "var(--text-secondary)",
              margin: "0 0 20px",
            }}
          >
            {featuredProject.desc}
          </p>
          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
            {featuredProject.tech.map((t) => (
              <span key={t} className="tag-pill">{t}</span>
            ))}
          </div>
          {/* GitHub link */}
          <a
            href={featuredProject.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              color: "var(--accent)",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.75")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            View on GitHub <ArrowUpRight size={13} />
          </a>
        </div>

        {/* RIGHT column — Terminal visual */}
        <div
          style={{
            padding: 24,
            display: "flex",
            alignItems: "center",
            borderLeft: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              background: "rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              padding: 20,
              width: "100%",
            }}
          >
            {/* Terminal header dots */}
            <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
              {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
                <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }} />
              ))}
            </div>
            {terminalLines.map((line, i) => (
              <div
                key={i}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: lineColor(line.type),
                  lineHeight: 1.8,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-all",
                }}
              >
                {line.text}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── THREE SMALLER PROJECT CARDS ───────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}
      >
        {smallProjects.map((p, i) => (
          <TiltCard key={p.title} index={i + 1}>
            <div
              style={{
                background: "var(--bg-card)",
                border: "var(--border-default)",
                borderRadius: 14,
                padding: "24px 24px 20px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "border 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.border = "var(--border-hover)";
                el.style.borderTop = "2px solid var(--accent)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.border = "var(--border-default)";
                el.style.borderTop = "var(--border-default)";
              }}
            >
              {/* Row 1: Category + Arrow */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "var(--text-muted)",
                    textTransform: "lowercase",
                  }}
                >
                  {p.category}
                </span>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    border: "var(--border-default)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-muted)",
                    flexShrink: 0,
                  }}
                >
                  <ArrowUpRight size={13} />
                </div>
              </div>

              {/* Row 2: Title */}
              <h3
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: 20,
                  color: "var(--text-primary)",
                  margin: "12px 0 6px",
                  lineHeight: 1.25,
                }}
              >
                {p.title}
              </h3>

              {/* Row 3: Status tag */}
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: "var(--text-muted)",
                  marginBottom: 8,
                }}
              >
                {p.status}
              </div>

              {/* Row 4: Description (2-line clamp) */}
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "var(--text-secondary)",
                  margin: 0,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                } as React.CSSProperties}
              >
                {p.desc}
              </p>

              {/* Row 5: Tech tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
                {p.tech.map((t) => (
                  <span key={t} className="tag-pill">{t}</span>
                ))}
              </div>

              {/* View case link */}
              <div
                style={{
                  marginTop: "auto",
                  paddingTop: 16,
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 13,
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
                >
                  View case →
                </a>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}
