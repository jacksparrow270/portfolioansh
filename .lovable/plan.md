
## Cinematic Developer Portfolio

A dark, premium single-experience portfolio inspired by the Mufi reference — orange↔purple glow orbs, glassmorphism cards, deep parallax, scroll-driven reveals.

### Routes
- `/` — Home (Hero)
- `/about` — About (with your celestial portrait blended in)
- `/projects` — Projects showcase
- `/contact` — Contact

Shared sticky **glass navigation** (Home · About · Projects · Contact + "Hire Me" pill) with active-link glow. Each route gets its own SEO `head()` metadata.

### Visual System
- **Palette:** near-black background, orange (#FF6A2C) ↔ magenta/purple (#B14CFF) gradients, soft white text, glass surfaces with subtle inner glow.
- **Typography:** large light-weight display headings (thin sans), small all-caps labels in pills.
- **Recurring motifs:** glowing orb halos (left orange / right purple), dotted starfield, gradient pill buttons, bordered glass cards with corner-dot accents.

### Hero (`/`)
- Two giant glowing orbs flanking a thin-weight headline: "Crafting Digital Experiences That Glow."
- Sub-pill tag ("✦ Full-Stack Developer"), short tagline, gradient "View Work" + ghost "Get in Touch" buttons.
- Logo marquee strip (placeholder tech logos: React, TypeScript, Node, etc.).
- Two preview glass cards beneath (current focus / latest project) mirroring the reference layout.
- **Effects:** orbs parallax on mouse-move + scroll, headline letters fade-up stagger, starfield drifts on scroll.

### About (`/about`)
- Split layout: your **celestial portrait** on the right inside the orange↔purple ring (image blends naturally — added vignette + glow halo so it sits in the scene, not pasted).
- Left: name placeholder, bio paragraph, stat tiles (Years / Projects / Stack), skill chips.
- **Effects:** image scales + ring rotates slowly on scroll, bio lines reveal on enter, parallax depth between portrait and background.

### Projects (`/projects`)
- 4–6 placeholder project cards in a staggered grid, each a glass tile with gradient hover glow, tags, and "View case →".
- Sticky section title that fades as cards scroll past.
- **Effects:** cards tilt on cursor (subtle 3D), scroll-triggered stagger reveal, hover lifts card + intensifies glow.

### Contact (`/contact`)
- Centered glass panel: short prompt + form (Name, Email, Message) with glowing focus states + gradient submit. Submission shows a success toast (no backend).
- Social row (GitHub, LinkedIn, X, Email) as glass icon pills.
- Footer with copyright + back-to-top.

### Animation & Scroll Layer (premium feel)
- **Framer Motion** for entrance, stagger, hover, and route transitions.
- Mouse-tracking parallax on orbs/portrait.
- Scroll-linked transforms (orb drift, headline opacity, card stagger) via `useScroll` / `useTransform`.
- Animated noise + dotted starfield overlay for depth.
- Smooth scroll behavior, custom cursor glow on interactive elements.
- Respects `prefers-reduced-motion`.

### Responsive
- Fully responsive; orbs scale down and stack on mobile, nav collapses to a glass sheet menu, portrait moves above bio on small screens.

### Deliverables
Routes + shared `Header`/`Footer`/`OrbBackground`/`Starfield` components, the uploaded portrait copied into `src/assets`, Framer Motion installed, placeholder content you can edit later.
