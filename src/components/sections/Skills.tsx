"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { useMouseSpotlight } from "@/hooks/useMouseSpotlight";

const skills = [
  { label: "Flutter", percentage: 93 },
  { label: "Django / Flask", percentage: 80 },
  { label: "HTML / CSS", percentage: 90 },
  { label: "UI Design", percentage: 100 },
  { label: "AI Prompting", percentage: 95 },
  { label: "Operations/Aws server / DBMS", percentage: 60 },
];

function SkillBar({
  skill,
  index,
}: {
  skill: (typeof skills)[0];
  index: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group"
    >
      {/* Label row */}
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-white text-sm font-semibold tracking-wide">
          {skill.label}
        </span>
        <motion.span
          className="text-xs font-bold tabular-nums"
          style={{ color: "#ffeb12" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.8 }}
        >
          {skill.percentage}%
        </motion.span>
      </div>

      {/* Track */}
      <div className="h-px bg-white/10 relative">
        {/* Fill */}
        <motion.div
          className="absolute top-0 left-0 h-full"
          style={{ backgroundColor: "#ffeb12" }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.percentage}%` } : {}}
          transition={{
            duration: 1.4,
            delay: index * 0.1 + 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
        {/* Glow dot at fill end */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: "#ffeb12", boxShadow: "0 0 6px #ffeb12" }}
          initial={{ left: 0, opacity: 0 }}
          animate={
            inView
              ? { left: `${skill.percentage}%`, opacity: 1 }
              : {}
          }
          transition={{
            duration: 1.4,
            delay: index * 0.1 + 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { overlayRef, onMouseMove, onMouseLeave } = useMouseSpotlight(
    "255,235,18",
    600,
    0.07
  );

  return (
    <section
      id="skills-section"
      className="py-28 px-6 relative overflow-hidden"
      style={{
        backgroundColor: "#0d0d0d",
        backgroundImage:
          "radial-gradient(circle, rgba(255,235,18,0.06) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ opacity: 0, transition: "opacity 0.6s ease" }}
      />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          {/* Left — heading */}
          <motion.div
            ref={ref}
            className="lg:w-5/12"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-[10px] font-semibold tracking-[0.4em] uppercase mb-4"
              style={{ color: "#ffeb12" }}
            >
              Expertise
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              My Skills
            </h2>
            <div className="mb-8">
              <Image
                src="/divider.png"
                alt=""
                width={76}
                height={20}
              />
            </div>
            <p className="text-white/40 text-sm font-light leading-relaxed max-w-xs">
              A diverse set of technical skills built over years of hands-on
              development across mobile, web, and backend platforms.
            </p>
          </motion.div>

          {/* Right — skill bars */}
          <div className="lg:w-7/12 w-full flex flex-col gap-8 pt-2">
            {skills.map((skill, index) => (
              <SkillBar key={skill.label} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
