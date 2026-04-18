import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { to: "/", label: "home" },
  { to: "/about", label: "about" },
  { to: "/projects", label: "projects" },
  { to: "/contact", label: "contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isActive = (to: string) =>
    to === "/" ? currentPath === "/" : currentPath.startsWith(to);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        position: "fixed",
        insetInline: 0,
        top: 0,
        zIndex: 50,
        background: "rgba(8,8,16,0.75)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: 1152,
          margin: "0 auto",
          padding: "0 16px",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo — raw text, no pill border */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 500,
              fontSize: 15,
              letterSpacing: "-0.01em",
            }}
          >
            <span style={{ color: "var(--accent)" }}>0x</span>
            <span style={{ color: "var(--text-primary)" }}>Ansh</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="hidden md:flex">
          {navItems.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13,
                  color: active ? "var(--text-primary)" : "var(--text-secondary)",
                  textDecoration: "none",
                  padding: "6px 14px",
                  borderRadius: 4,
                  position: "relative",
                  transition: "color 0.2s ease",
                }}
              >
                {item.label}
                {active && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 14,
                      right: 14,
                      height: 2,
                      background: "var(--accent)",
                      borderRadius: 1,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Available for Internships CTA */}
        <a
          href="/contact"
          className="hidden md:inline-flex"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: "var(--accent)",
            background: "transparent",
            border: "1px solid var(--accent)",
            borderRadius: 6,
            padding: "6px 14px",
            textDecoration: "none",
            transition: "background 0.2s ease",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "var(--accent-dim)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "transparent")
          }
        >
          Available for Internships
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          style={{
            background: "transparent",
            border: "var(--border-default)",
            borderRadius: 6,
            padding: 8,
            color: "var(--text-secondary)",
            cursor: "pointer",
          }}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: "absolute",
            right: 16,
            top: 64,
            background: "rgba(8,8,16,0.95)",
            backdropFilter: "blur(14px)",
            border: "var(--border-default)",
            borderRadius: 12,
            padding: 12,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            minWidth: 200,
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: isActive(item.to) ? "var(--text-primary)" : "var(--text-secondary)",
                textDecoration: "none",
                padding: "8px 12px",
                borderRadius: 6,
              }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="/contact"
            onClick={() => setOpen(false)}
            style={{
              marginTop: 4,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: "var(--accent)",
              border: "1px solid var(--accent)",
              borderRadius: 6,
              padding: "8px 12px",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Available for Internships
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
