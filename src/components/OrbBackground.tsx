import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function OrbBackground() {
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const y1 = useTransform(scrollY, [0, 1000], [0, reduce ? 0 : 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, reduce ? 0 : -180]);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Orange orb — left, dialled down to ~22% max opacity via CSS gradient */}
      <motion.div
        style={{ y: y1, x: mouse.x, translateY: mouse.y }}
        className="absolute -left-40 top-20 h-[600px] w-[600px] rounded-full orb-orange animate-float-slow"
      />
      {/* Purple orb — right, dialled down to ~20% max opacity */}
      <motion.div
        style={{ y: y2, x: -mouse.x, translateY: -mouse.y }}
        className="absolute -right-40 top-1/3 h-[700px] w-[700px] rounded-full orb-purple animate-float-slower"
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, oklch(0.13 0.02 290 / 70%) 100%)",
        }}
      />
    </div>
  );
}
