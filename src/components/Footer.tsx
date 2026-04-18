import { Github, Linkedin, Twitter, Mail, ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/5 px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <p className="text-sm text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          &copy; {new Date().getFullYear()} Ansh Khare &mdash; 0xAnsh
        </p>
        <div className="flex items-center gap-3">
          {[
            { icon: Github, href: "#" },
            { icon: Linkedin, href: "#" },
            { icon: Twitter, href: "#" },
            { icon: Mail, href: "#" },
          ].map(({ icon: Icon, href }, i) => (
            <a
              key={i}
              href={href}
              className="glass rounded-full p-2.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="glass rounded-full p-2.5 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
