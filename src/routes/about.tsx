import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Scan, Activity, Terminal } from "lucide-react";
import portrait from "@/assets/about-portrait.png";

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
    skills: [
      { name: "AWS",     slug: "amazonwebservices", color: "#FF9900", opacity: 0.8 },
      { name: "Docker",  slug: "docker",            color: "#2496ED", opacity: 0.8 },
      { name: "Linux",   slug: "linux",             color: "#FCC624", opacity: 0.75 },
      { name: "Bash",    slug: "gnubash",           color: "#4EAA25", opacity: 0.8 },
      { name: "Git",     slug: "git",               color: "#F05032", opacity: 0.8 },
      { name: "GitHub",  slug: "github",            color: "#ffffff", opacity: 0.7 },
    ],
  },
  {
    label: "development",
    skills: [
      { name: "Python",  slug: "python",   color: "#3776AB", opacity: 0.85 },
      { name: "Flask",   slug: "flask",    color: "#ffffff", opacity: 0.65 },
      { name: "SQLite",  slug: "sqlite",   color: "#44A8E0", opacity: 0.85 },
    ],
  },
  {
    label: "security",
    skills: [
      { name: "Kali Linux",  slug: "kalilinux",  color: "#557C94", opacity: 0.8 },
      { name: "Nmap",        slug: "nmap",        color: "#E8622A", opacity: 0.8 },
      { name: "Burp Suite",  slug: "burpsuite",   color: "#FF6633", opacity: 0.8 },
      { name: "Wireshark",   slug: "wireshark",   color: "#1679A7", opacity: 0.8 },
      { name: "Nessus",      slug: "tenable",     color: "#00B4E6", opacity: 0.8 },
    ],
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

const timelineEntries = [
  {
    title: "B.Tech — Cybersecurity",
    institution: "SAKEC, Mumbai",
    dates: "2024 – 2028 (ongoing)",
    location: "India",
    bullets: [
      "Studying cloud security, network defense, application security, and threat detection",
      "Coursework includes OS internals, Unix shell programming, networking, and DevOps/CI-CD",
      "Practical labs in vulnerability assessment, penetration testing, and malware analysis",
    ],
  },
  {
    title: "Independent Security Researcher",
    institution: "Self-directed",
    dates: "2024 – present",
    location: "Remote",
    bullets: [
      "Deployed cloud honeypot on AWS EC2, capturing and analyzing real attacker TTPs",
      "Built Python-based packet capture tool for local VM network monitoring",
      "Participates in CTF competitions focused on cloud and web security challenges",
    ],
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
            const el = e.target as HTMLElement;
            const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
            setTimeout(() => {
              el.classList.add("visible");
            }, delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.1 },
    );
    els.forEach((el, i) => {
      (el as HTMLElement).dataset.delay = String(i * 50);
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────
function AboutPage() {
  useReveal();

  return (
    <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 24px 64px" }}>

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
        className="about-top-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 220px",
          gap: 40,
          alignItems: "start",
        }}
      >
        {/* LEFT COLUMN — heading + bio */}
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
        </div>

        {/* RIGHT COLUMN — portrait */}
        <motion.div
          className="about-portrait"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ position: "sticky", top: 80 }}
        >
          <div
            style={{
              width: 260,
              aspectRatio: "1 / 1",
              borderRadius: "50%",
              border: "var(--border-default)",
              background:
                "radial-gradient(circle at 50% 20%, rgba(232,98,42,0.22), rgba(255,255,255,0.02) 58%, rgba(255,255,255,0.01) 100%)",
              padding: 10,
              overflow: "hidden",
              boxShadow: "0 18px 48px rgba(0, 0, 0, 0.28)",
            }}
          >
            <img
              src={portrait}
              alt="Ansh Khare"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "center top",
                borderRadius: "50%",
                display: "block",
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* ── STATS ROW ───────────────────────────────────────────────────────── */}
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
                fontSize: 48,
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

      {/* ── GITHUB INSIGHTS ─────────────────────────────────────────────────── */}
      <div className="reveal" style={{ marginTop: 72 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          <span className="eyebrow-dot" />
          github activity
        </div>
        <h2
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 600,
            fontSize: 22,
            color: "var(--text-primary)",
            margin: "0 0 20px",
          }}
        >
          Code Presence
        </h2>
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "var(--border-default)",
            borderRadius: 12,
            padding: 24,
          }}
        >
          <img
            src="https://ghchart.rshah.org/E8622A/jacksparrow270"
            alt="GitHub contribution graph"
            style={{ width: "100%", borderRadius: 8, opacity: 0.85, display: "block" }}
          />
          {/* Mini stats row */}
          <div
            style={{
              marginTop: 16,
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "var(--text-muted)",
              }}
            >
              80 contributions this year
            </span>
            <span style={{ color: "rgba(255,255,255,0.1)", userSelect: "none" }}>·</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "var(--text-muted)",
              }}
            >
              4 public repos
            </span>
            <span style={{ color: "rgba(255,255,255,0.1)", userSelect: "none" }}>·</span>
            <a
              href="https://github.com/jacksparrow270"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "var(--accent)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "underline")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "none")}
            >
              github.com/jacksparrow270
            </a>
          </div>
        </div>
      </div>

      {/* ── EXPERIENCE / EDUCATION TIMELINE ─────────────────────────────────── */}
      <div className="reveal" style={{ marginTop: 72 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          <span className="eyebrow-dot" />
          experience &amp; education
        </div>
        <h2
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 600,
            fontSize: 22,
            color: "var(--text-primary)",
            margin: "0 0 32px",
          }}
        >
          Background
        </h2>

        {/* Timeline container with left accent line */}
        <div style={{ position: "relative", paddingLeft: 24 }}>
          {/* Vertical accent line */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 1,
              background: "rgba(232,98,42,0.25)",
            }}
          />

          {timelineEntries.map((entry, i) => (
            <div
              key={i}
              className="reveal timeline-entry"
              data-delay={String(i * 120)}
              style={{
                display: "grid",
                gridTemplateColumns: "240px 1fr",
                gap: 32,
                paddingTop: i === 0 ? 0 : 32,
                marginTop: i === 0 ? 0 : 32,
                borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* LEFT — sticky label area */}
              <div style={{ paddingTop: 2 }}>
                <div
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: 16,
                    color: "var(--text-primary)",
                    lineHeight: 1.3,
                    marginBottom: 6,
                  }}
                >
                  {entry.title}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 13,
                    color: "var(--accent)",
                    marginBottom: 4,
                  }}
                >
                  {entry.institution}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "var(--text-muted)",
                    marginBottom: 2,
                  }}
                >
                  {entry.dates}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "var(--text-muted)",
                  }}
                >
                  {entry.location}
                </div>
              </div>

              {/* RIGHT — bullet content */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {entry.bullets.map((bullet, j) => (
                  <div
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                    }}
                  >
                    {/* Accent square bullet marker */}
                    <div
                      style={{
                        width: 4,
                        height: 4,
                        background: "var(--accent)",
                        borderRadius: 1,
                        flexShrink: 0,
                        marginTop: 8,
                      }}
                    />
                    <p
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: 14,
                        lineHeight: 1.7,
                        color: "var(--text-secondary)",
                        margin: 0,
                      }}
                    >
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
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

      {/* ── SKILLS GRID ─────────────────────────────────────────────────────── */}
      <div className="reveal" style={{ marginTop: 64 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          <span className="eyebrow-dot" />
          tools &amp; technologies
        </div>
        <h2
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 600,
            fontSize: 22,
            color: "var(--text-primary)",
            margin: "0 0 28px",
          }}
        >
          Skills
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {skillGroups.map((group) => (
            <div key={group.label}>
              {/* Group label */}
              <p className="eyebrow" style={{ marginBottom: 12 }}>
                <span className="eyebrow-dot" />
                {group.label}
              </p>
              {/* Skill tiles row */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {group.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    className="reveal skill-tile"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    style={{
                      minWidth: 80,
                      height: 72,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      borderRadius: 10,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      padding: "12px 16px",
                      transition: "all 0.2s ease",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "rgba(255,255,255,0.08)";
                      el.style.borderColor = "rgba(255,255,255,0.18)";
                      el.style.transform = "translateY(-2px)";
                      const img = el.querySelector("img") as HTMLImageElement | null;
                      if (img) img.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "rgba(255,255,255,0.04)";
                      el.style.borderColor = "rgba(255,255,255,0.08)";
                      el.style.transform = "translateY(0)";
                      const img = el.querySelector("img") as HTMLImageElement | null;
                      if (img) img.style.opacity = String(skill.opacity);
                    }}
                  >
                    <img
                      src={`https://cdn.simpleicons.org/${skill.slug}/${skill.color.replace("#", "")}`}
                      alt={skill.name}
                      width={24}
                      height={24}
                      style={{ opacity: skill.opacity, display: "block", flexShrink: 0 }}
                      onError={(e) => {
                        const img = e.currentTarget;
                        img.style.display = "none";
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
                        color: "var(--text-secondary)",
                        textAlign: "center",
                        lineHeight: 1.2,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
