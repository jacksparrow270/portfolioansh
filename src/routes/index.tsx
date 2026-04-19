import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Cloud, Shield } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "0xAnsh — Cybersecurity & Cloud" },
      {
        name: "description",
        content: "Ansh Khare — Cloud Security Engineer. AWS, Python, Linux.",
      },
      { property: "og:title", content: "0xAnsh — Cybersecurity & Cloud" },
      {
        property: "og:description",
        content: "Cloud Security Engineer. AWS, Python, Linux.",
      },
    ],
  }),
  component: HomePage,
});

// ─── DATA ──────────────────────────────────────────────────────────────────
const techStrip = [
  "AWS", "EC2", "CloudWatch", "Docker", "Linux", "Bash",
  "Python", "Flask", "Git", "Nmap", "Kali Linux", "Wireshark",
];

const stats = [
  { v: "12", l: "aws services used" },
  { v: "6",  l: "python projects built" },
  { v: "47", l: "ctf flags captured" },
  { v: "80", l: "github contributions" },
];

const focusCards = [
  {
    label: "current build",
    title: "Cloud-native threat detection stack on AWS",
    desc: "GuardDuty findings piped through Lambda into a CloudWatch dashboard. Python script aggregates alerts and sends Slack notifications for high-severity events.",
    icon: Cloud,
  },
  {
    label: "latest shipped",
    title: "CloudHoneypot — attacker telemetry on EC2",
    desc: "Public honeypot with CloudWatch ingestion. Geo-IP mapped 400+ unique attacker IPs in the first week.",
    icon: Shield,
  },
];

// ─── TYPEWRITER HOOK ────────────────────────────────────────────────────────
const HERO_TEXT = "I build infrastructure.\nThen I try to break it.";

function useTypewriter(delay = 400) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone]           = useState(false);

  useEffect(() => {
    let i = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    function type() {
      if (i < HERO_TEXT.length) {
        const ch = HERO_TEXT[i++];
        setDisplayed((prev) => prev + ch);
        const speed = i < 24 ? 55 : 35;
        timeoutId = setTimeout(type, speed);
      } else {
        setDone(true);
      }
    }

    timeoutId = setTimeout(type, delay);
    return () => clearTimeout(timeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [displayed, done] as const;
}

// ─── SCROLL REVEAL ──────────────────────────────────────────────────────────
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

// ─── RENDER HERO TEXT ───────────────────────────────────────────────────────
function renderHeroText(text: string, cursorVisible: boolean) {
  const newlineIdx = text.indexOf("\n");
  if (newlineIdx === -1) {
    return (
      <>
        {text}
        {cursorVisible && (
          <span
            aria-hidden
            style={{
              display: "inline-block",
              width: 2,
              height: "0.85em",
              background: "var(--accent)",
              marginLeft: 2,
              verticalAlign: "text-bottom",
              borderRadius: 1,
              animation: "blink 0.9s step-end infinite",
            }}
          />
        )}
      </>
    );
  }
  const line1 = text.slice(0, newlineIdx);
  const line2 = text.slice(newlineIdx + 1);
  return (
    <>
      {line1}
      {"\n"}
      <span style={{ color: "var(--accent)", fontStyle: "italic" }}>
        {line2}
      </span>
      {cursorVisible && (
        <span
          aria-hidden
          style={{
            display: "inline-block",
            width: 2,
            height: "0.85em",
            background: "var(--accent)",
            marginLeft: 2,
            verticalAlign: "text-bottom",
            borderRadius: 1,
            animation: "blink 0.9s step-end infinite",
          }}
        />
      )}
    </>
  );
}

// ─── PAGE ───────────────────────────────────────────────────────────────────
function HomePage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const heroY       = useTransform(scrollYProgress, [0, 1], [0, 140]);

  const [displayed, typingDone] = useTypewriter(350);
  useReveal();

  return (
    <div ref={ref} className="relative">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "88vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          paddingTop: 120,
          paddingBottom: 80,
          paddingLeft: 24,
          paddingRight: 24,
          maxWidth: 960,
          margin: "0 auto",
        }}
      >
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="flex flex-col items-center"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="eyebrow"
            style={{ marginBottom: 32, justifyContent: "center" }}
          >
            <span className="eyebrow-dot" />
            cloud security engineer
          </motion.div>

          {/* H1 — typewriter target */}
          <h1
            className="hero-heading"
            style={{
              fontFamily: "'Syne', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(40px, 6vw, 64px)",
              lineHeight: 1.1,
              color: "var(--text-primary)",
              margin: 0,
              maxWidth: 800,
              whiteSpace: "pre-wrap",
              minHeight: "2.2em",
            }}
          >
            {renderHeroText(displayed, !typingDone)}
          </h1>

          {/* Sub — fades in after typing */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: typingDone ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeIn" }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              lineHeight: 1.65,
              color: "var(--text-muted)",
              margin: "20px auto 0",
              maxWidth: 560,
              textAlign: "center",
            }}
          >
            Cloud Security · AWS · Python · Linux
          </motion.p>

          {/* CTAs — fades in after typing */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: typingDone ? 1 : 0, y: typingDone ? 0 : 12 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ marginTop: 32, display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}
          >
            <Link
              to="/projects"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: "#080810",
                background: "var(--accent)",
                borderRadius: 6,
                padding: "10px 22px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.88")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              View My Work <ArrowRight size={14} />
            </Link>
            <a
              href="https://github.com/anshkhare"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: "var(--text-secondary)",
                background: "transparent",
                border: "var(--border-default)",
                borderRadius: 6,
                padding: "10px 22px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)")
              }
            >
              GitHub <ArrowUpRight size={13} />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── TECH MARQUEE ─────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "14px 0",
          background: "rgba(255,255,255,0.01)",
          margin: 0,
          width: "100%",
        }}
      >
        <div className="animate-marquee" style={{ display: "flex", gap: 48, whiteSpace: "nowrap" }}>
          {[...techStrip, ...techStrip].map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: "var(--text-muted)",
              }}
            >
              {item}
              <span style={{ color: "var(--text-muted)", margin: "0 0 0 48px" }}>·</span>
            </span>
          ))}
        </div>
      </section>

      {/* ── FOCUS CARDS ──────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1152,
          margin: "80px auto 0",
          padding: "0 24px",
        }}
      >
        {/* Section eyebrow */}
        <div className="eyebrow reveal" style={{ marginBottom: 24 }}>
          <span className="eyebrow-dot" />
          what i'm building
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          {focusCards.map((card, i) => (
            <motion.div
              key={i}
              className="reveal card group focus-card-tilt"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              style={{ padding: 24 }}
            >
              {/* Icon badge */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: "var(--accent-dim)",
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                <card.icon size={18} style={{ color: "var(--accent)" }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "var(--text-muted)",
                  }}
                >
                  {card.label}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: 18,
                  color: "var(--text-primary)",
                  lineHeight: 1.35,
                  margin: "0 0 10px",
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "var(--text-secondary)",
                  margin: 0,
                }}
              >
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────────────────── */}
      <section
        className="reveal"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1152,
          margin: "80px auto 0",
          padding: "48px 24px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            textAlign: "center",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="reveal"
              style={{
                borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                padding: "0 24px",
              }}
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
                  marginTop: 8,
                  textTransform: "lowercase",
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA FOOTER ───────────────────────────────────────────────────── */}
      <section
        className="reveal"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 720,
          margin: "96px auto 0",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "'Syne', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(32px, 4vw, 48px)",
            color: "var(--text-primary)",
            margin: "0 0 16px",
          }}
        >
          Open to cloud internships and security roles.
        </h2>
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 15,
            lineHeight: 1.65,
            color: "var(--text-secondary)",
            margin: "0 0 32px",
          }}
        >
          Based in India. Available for remote internships and entry-level cloud or cloud security roles.
        </p>
        <Link
          to="/contact"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            color: "#080810",
            background: "var(--accent)",
            borderRadius: 6,
            padding: "12px 28px",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          Get in Touch <ArrowRight size={14} />
        </Link>
      </section>
    </div>
  );
}
