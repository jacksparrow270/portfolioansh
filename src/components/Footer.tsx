import { Github, Linkedin, Mail } from "lucide-react";

const footerLinks = [
  {
    icon: Github,
    href: "https://github.com/jacksparrow270",
    label: "GitHub",
    color: "rgba(255,255,255,0.55)",
    hoverColor: "rgba(255,255,255,0.95)",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/anshkhare",
    label: "LinkedIn",
    color: "rgba(10,102,194,0.75)",
    hoverColor: "#0A66C2",
  },
  {
    icon: Mail,
    href: "mailto:ansh@example.com",
    label: "Email",
    color: "rgba(232,98,42,0.65)",
    hoverColor: "var(--accent)",
  },
];

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "32px 24px",
        marginTop: 48,
      }}
    >
      <div
        style={{
          maxWidth: 1152,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        {/* Left: copyright */}
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: "var(--text-muted)",
            margin: 0,
          }}
        >
          © {new Date().getFullYear()} Ansh Khare — 0xAnsh
        </p>

        {/* Right: icon links */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {footerLinks.map(({ icon: Icon, href, label, color, hoverColor }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                color,
                display: "flex",
                alignItems: "center",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = hoverColor)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = color)
              }
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
