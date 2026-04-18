import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Scan, Activity, Terminal } from "lucide-react";
import portrait from "@/assets/portrait.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — 0xAnsh" },
      {
        name: "description",
        content:
          "Ansh Khare — Cloud Security Engineer. B.Tech Cybersecurity. AWS, Python, Linux.",
      },
      { property: "og:title", content: "About — 0xAnsh" },
      {
        property: "og:description",
        content: "Cloud Security Engineer. B.Tech Cybersecurity. AWS, Python, Linux.",
      },
    ],
  }),
  component: AboutPage,
});

// ─── DATA ─────────────────────────────────────────────────────────────────────
const skillGroups = [
  {
    label: "cloud & infra",
    skills: ["AWS", "EC2", "CloudWatch", "Docker", "Linux", "Bash", "Git"],
  },
  {
    label: "development",
    skills: ["Python", "Flask", "SQLite"],
  },
  {
    label: "security",
    skills: ["Kali Linux", "Nmap", "Burp Suite", "Wireshark", "Nessus"],
  },
] as const;

const aboutStats = [
  { v: "12", l: "aws services used" },
  { v: "47", l: "ctf flags captured" },
  { v: "3",  l: "certifications pursued" },
];

const approachCards = [
  {
    icon: Scan,
    title: "Understand the blast radius",
    body: "Before touching a tool, I map what's exposed, what's connected, and what breaks if something goes wrong. Security starts with knowing your own surface.",
  },
  {
    icon: Activity,
    title: "Build observable systems",
    body: "Logs, alerts, and dashboards aren't optional. Every project I build has some form of visibility — whether that's CloudWatch, structured JSON output, or a simple alert script.",
  },
  {
    icon: Terminal,
    title: "Automate the boring, audit the rest",
    body: "Repetitive tasks get scripted in Python or Bash. Whatever's left gets reviewed manually — because automation without oversight is just faster chaos.",
  },
];

// ─── REVEAL ───────────────────────────────────────────────────────────────────
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
      { threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────
function AboutPage() {
  useReveal();

  return (
    <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 24px 48px" }}>

      {/* ── EYEBROW ─────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="eyebrow"
        style={{ marginBottom: 32 }}
      >
        <span className="eyebrow-dot" />
        about
      </motion.div>

      {/* ── TOP BLOCK: heading + portrait (grid 1fr 220px) ───────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 220px",
          gap: 40,
          alignItems: "start",
        }}
      >
        {/* LEFT COLUMN — heading + bio + stats */}
        <div>
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            style={{
              fontFamily: "'Syne', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(36px, 4.5vw, 52px)",
              lineHeight: 1.1,
              color: "var(--text-primary)",
              margin: "0 0 28px",
            }}
          >
            Cloud Security{" "}
            <span style={{ color: "var(--accent)", fontStyle: "italic" }}>Engineer.</span>
            <br />
            Builder first.
          </motion.h1>

          {/* Bio paragraphs */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            {[
              "I build on AWS, secure what I deploy, and automate everything in Python.",
              "B.Tech Cybersecurity student focused on cloud infrastructure, threat detection, and writing tools that make security observable.",
              "When I'm not in a terminal, I'm working through CVE advisories, running pentest labs, or improving my homelab detection stack.",
            ].map((p, i) => (
              <motion.p
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
                }}
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: "var(--text-secondary)",
                  margin: 0,
                }}
              >
                {p}
              </motion.p>
            ))}
          </motion.div>

          {/* Stats row */}
          <div
            style={{
              marginTop: 36,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            {aboutStats.map((s, i) => (
              <motion.div
                key={i}
                className="card reveal"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{ textAlign: "center", padding: 20 }}
              >
                <div
                  style={{
                    fontFamily: "'Syne', system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: 30,
                    color: "var(--text-primary)",
                    lineHeight: 1,
                  }}
                >
                  {s.v}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "var(--text-muted)",
                    marginTop: 6,
                  }}
                >
                  {s.l}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN — portrait, top-aligned to heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ position: "sticky", top: 80 }}
        >
          <img
            src={portrait}
            alt="Ansh Khare"
            style={{
              width: 220,
              height: 260,
              objectFit: "cover",
              borderRadius: 12,
              border: "var(--border-default)",
              display: "block",
            }}
          />
        </motion.div>
      </div>

      {/* ── MY APPROACH ─────────────────────────────────────────────────────── */}
      <div className="reveal" style={{ marginTop: 72 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          <span className="eyebrow-dot" />
          how i work
        </div>
        <h2
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 600,
            fontSize: 22,
            color: "var(--text-primary)",
            margin: "0 0 24px",
          }}
        >
          My Approach
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          {approachCards.map((card, i) => (
            <motion.div
              key={i}
              className="reveal"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "var(--border-default)",
                borderRadius: 12,
                padding: 20,
                transition: "border-color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.border = "var(--border-hover)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.border = "var(--border-default)")
              }
            >
              <card.icon size={16} style={{ color: "var(--accent)" }} />
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  color: "var(--text-primary)",
                  margin: "12px 0 8px",
                }}
              >
                {card.title}
              </p>
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: "var(--text-secondary)",
                  margin: 0,
                }}
              >
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── SKILLS GRID (three groups, full width) ──────────────────────────── */}
      <div className="reveal" style={{ marginTop: 64 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 32,
          }}
        >
          {skillGroups.map((group) => (
            <div key={group.label}>
              <p className="eyebrow" style={{ marginBottom: 14 }}>
                <span className="eyebrow-dot" />
                {group.label}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {group.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.88 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    title={skill}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      justifyContent: "center",
                      cursor: "default",
                      transition: "background 0.2s, border-color 0.2s",
                      position: "relative",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "rgba(255,255,255,0.08)";
                      el.style.borderColor = "rgba(255,255,255,0.16)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "rgba(255,255,255,0.04)";
                      el.style.borderColor = "rgba(255,255,255,0.08)";
                    }}
                  >
                    <img
                      src={`https://cdn.simpleicons.org/${skill.toLowerCase().replace(/\s+/g, "")}/ffffff`}
                      alt={skill}
                      title={skill}
                      width={20}
                      height={20}
                      style={{ opacity: 0.65 }}
                      onError={(e) => {
                        const img = e.currentTarget;
                        img.style.display = "none";
                        const parent = img.parentElement;
                        if (parent && !parent.querySelector(".skill-fallback")) {
                          const span = document.createElement("span");
                          span.className = "skill-fallback";
                          span.style.fontFamily = "'JetBrains Mono', monospace";
                          span.style.fontSize = "9px";
                          span.style.color = "rgba(255,255,255,0.5)";
                          span.textContent = skill.slice(0, 3).toUpperCase();
                          parent.appendChild(span);
                        }
                      }}
                    />
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
