import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";

const navItems = [
  { to: "/", label: "home" },
  { to: "/about", label: "about" },
  { to: "/projects", label: "projects" },
  { to: "/contact", label: "contact" },
] as const;

export function Header() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isActive = (to: string) =>
    to === "/" ? currentPath === "/" : currentPath.startsWith(to);

  return (
    <header
      style={{
        position: "fixed",
        top: 20,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        padding: "0 12px",
        zIndex: 1000,
      }}
    >
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
        display: "flex",
        alignItems: "center",
        gap: 32,
        padding: "12px 28px",
        width: "fit-content",
        maxWidth: "100%",
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 120, 50, 0.5)",
        borderRadius: 50,
        boxShadow: "0 0 12px rgba(255, 100, 30, 0.25)",
      }}
      >
        <Link to="/" style={{ textDecoration: "none", flexShrink: 0 }}>
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

      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: 32,
          flexWrap: "wrap",
        }}
      >
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
                position: "relative",
                transition: "color 0.2s ease",
                whiteSpace: "nowrap",
              }}
            >
              {item.label}
              {active && (
                <span
                  style={{
                    position: "absolute",
                    bottom: -6,
                    left: 0,
                    right: 0,
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

      <a
        href="/contact"
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
          flexShrink: 0,
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
      </motion.nav>
    </header>
  );
}
