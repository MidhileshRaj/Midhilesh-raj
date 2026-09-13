"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { useMouseSpotlight } from "@/hooks/useMouseSpotlight";

const skillGroups = [
  { label: "Languages", skills: ["Dart", "Python", "JavaScript", "Java (Android)"] },
  {
    label: "Mobile Development",
    skills: ["Flutter", "Android", "iOS", "Cross-Platform", "App Store Connect", "Google Play Console"],
  },
  {
    label: "State Management & Architecture",
    skills: ["BLoC / Cubit", "Riverpod", "GetX", "Provider", "Stacked (MVVM)", "MVC"],
  },
  { label: "Backend & APIs", skills: ["Django", "Flask", "Spring Boot", "REST APIs", "Webhooks"] },
  { label: "Frontend", skills: ["HTML", "CSS", "JavaScript", "Bootstrap", "React"] },
  {
    label: "Databases",
    skills: ["MySQL", "PostgreSQL", "Cloud Firestore", "SQLite", "Hive", "Redis"],
  },
  { label: "Payment Gateways", skills: ["Cashfree (Easy Split, webhooks)", "Stripe"] },
  {
    label: "Cloud & Services",
    skills: ["Firebase Auth", "Firestore", "Cloud Messaging", "Firebase Storage", "AWS S3", "CloudFront"],
  },
  { label: "Tools", skills: ["Git", "GitHub", "Postman", "Figma"] },
  {
    label: "Practices",
    skills: ["Agile", "CI/CD", "Code Review", "QA Coordination", "Regression Testing", "DSA"],
  },
];

function SkillGroup({
  group,
  index,
}: {
  group: (typeof skillGroups)[0];
  index: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: "easeOut" }}
      className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-6 pb-6 border-b border-white/6"
    >
      <span
        className="sm:w-48 flex-shrink-0 text-[10px] font-bold tracking-[0.2em] uppercase"
        style={{ color: "#ffeb12" }}
      >
        {group.label}
      </span>
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="text-xs text-white/75 px-3 py-1.5 border border-white/10 rounded-full"
          >
            {skill}
          </span>
        ))}
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
            className="lg:w-4/12"
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
              4+ years of shipping production Flutter apps across Android and
              iOS, backed by hands-on Python and backend development.
            </p>
          </motion.div>

          {/* Right — skill groups */}
          <div className="lg:w-8/12 w-full flex flex-col gap-6 pt-2">
            {skillGroups.map((group, index) => (
              <SkillGroup key={group.label} group={group} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
