import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Github, Linkedin, Mail } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — 0xAnsh" },
      {
        name: "description",
        content:
          "Ansh Khare — open to cloud internships and security roles. Based in India.",
      },
      { property: "og:title", content: "Contact — 0xAnsh" },
      {
        property: "og:description",
        content: "Open to cloud internships and entry-level cloud security roles.",
      },
    ],
  }),
  component: ContactPage,
});

// ─── PAGE ──────────────────────────────────────────────────────────────────
function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent.", {
        description: "I'll get back to you within 24 hours.",
      });
      (e.target as HTMLFormElement).reset();
    }, 900);
  };

  const socials = [
    {
      icon: Github,
      label: "github.com/anshkhare",
      href: "https://github.com/anshkhare",
    },
    {
      icon: Linkedin,
      label: "linkedin.com/in/anshkhare",
      href: "https://linkedin.com/in/anshkhare",
    },
    {
      icon: Mail,
      label: "ansh@email.com",
      href: "mailto:ansh@email.com",
    },
  ];

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 80px" }}>
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: 48 }}
      >
        <div className="eyebrow" style={{ marginBottom: 16 }}>
          <span className="eyebrow-dot" />
          contact
        </div>
        <h1
          style={{
            fontFamily: "'Syne', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(32px, 5vw, 48px)",
            lineHeight: 1.1,
            color: "var(--text-primary)",
            margin: "0 0 16px",
          }}
        >
          Open to cloud internships and security roles.
        </h1>
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 15,
            lineHeight: 1.65,
            color: "var(--text-secondary)",
            margin: 0,
          }}
        >
          Based in India. Available for remote internships and entry-level cloud
          or cloud security roles from 2025.
        </p>
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          padding: 32,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <Field label="name" name="name" required />
          <Field label="email" name="email" type="email" required />
        </div>
        <div>
          <label
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "var(--text-muted)",
              display: "block",
              marginBottom: 8,
              textTransform: "lowercase",
            }}
          >
            message
          </label>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="What are you working on?"
            style={{
              width: "100%",
              resize: "none",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: 8,
              padding: "12px 16px",
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 15,
              color: "var(--text-primary)",
              outline: "none",
              transition: "border-color 0.2s",
              boxSizing: "border-box",
            }}
            onFocus={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.22)")
            }
            onBlur={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.09)")
            }
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              color: "#080810",
              background: loading ? "rgba(232,98,42,0.6)" : "var(--accent)",
              border: "none",
              borderRadius: 6,
              padding: "12px 24px",
              cursor: loading ? "not-allowed" : "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              transition: "opacity 0.2s",
            }}
          >
            {loading ? "Sending…" : "Send message"}
            <Send size={14} />
          </button>
        </div>
      </motion.form>

      {/* Social links row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{
          marginTop: 40,
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
        }}
      >
        {socials.map(({ icon: Icon, label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: "var(--text-muted)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")
            }
          >
            <Icon size={16} />
            {label}
          </a>
        ))}
      </motion.div>
    </div>
  );
}

// ─── FIELD ────────────────────────────────────────────────────────────────
function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: "var(--text-muted)",
          display: "block",
          marginBottom: 8,
          textTransform: "lowercase",
        }}
      >
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={label}
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: 8,
          padding: "12px 16px",
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: 15,
          color: "var(--text-primary)",
          outline: "none",
          transition: "border-color 0.2s",
          boxSizing: "border-box",
        }}
        onFocus={(e) =>
          ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.22)")
        }
        onBlur={(e) =>
          ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.09)")
        }
      />
    </div>
  );
}
