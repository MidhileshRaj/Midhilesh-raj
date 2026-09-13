"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { useMouseSpotlight } from "@/hooks/useMouseSpotlight";

type ExperienceEntry = {
  id: number;
  company: string;
  role: string;
  logo?: string;
  period: string;
  location: string;
  points: string[];
};

const experiences: ExperienceEntry[] = [
  {
    id: 1,
    company: "Occazone Pvt. Ltd.",
    role: "Mobile App Development Lead",
    logo: "/occazone_img.jpg",
    period: "October 2025 — Present",
    location: "Kerala",
    points: [
      "Lead mobile application development for Occazone, a product-based multi-vendor events marketplace connecting customers with convention halls, party halls, photographers, makeover studios, caterers and transportation vendors across Kerala.",
      "Own the Flutter application end to end — architecture, feature development and release management — and drive App Store and Google Play submissions through review to launch.",
      "Integrated Cashfree Easy Split payments with a split-after-success settlement flow and webhook-driven booking confirmation to handle multi-vendor orders.",
      "Implemented Firebase Cloud Messaging with semantic notification routing so users receive timely booking and payment updates.",
      "Partner with founders and cross-functional teams on product-domain discussions and roadmap planning, translating business goals into technical requirements and prioritised delivery.",
      "Collaborate with backend (Spring Boot, PostgreSQL, Redis) and web (React) teams to keep mobile, API and web releases aligned, and coordinate QA and defect triage ahead of each release.",
    ],
  },
  {
    id: 2,
    company: "Ecochoice Naturals Pvt. Ltd.",
    role: "Software Developer (Flutter & Python)",
    period: "October 2024 — September 2025",
    location: "Kerala",
    points: [
      "Maintained and optimised a production Agri-Tech Flutter application, integrating backend enhancements and resolving over 90% of user-reported bugs.",
      "Managed and deployed backend server updates, API endpoints and environment configurations, reducing downtime by ~30% and speeding up feature rollout.",
      "Led end-to-end development across mobile and backend architecture, ensuring seamless integration, performance tuning and high availability of critical systems.",
      "Improved AI/ML model performance by ~25% by labelling farm-produce image datasets (millet, rice, wheat) and streamlining dataset accuracy.",
      "Supported AI model integration across training-data pipelines and deployment, improving automation in quality-grading workflows.",
      "Coordinated QA checks and regression testing each release cycle to keep the application stable and reliable.",
    ],
  },
  {
    id: 3,
    company: "Futura Labs",
    role: "Flutter Developer",
    logo: "/futura_logo_1.jpg",
    period: "June 2023 — October 2024",
    location: "Kozhikode",
    points: [
      "Built and shipped multiple Flutter applications, optimising state management with GetX and Provider to improve performance by ~40% and reduce bugs.",
      "Integrated Firebase Authentication and Cloud Firestore for authentication, storage and notifications, cutting login times by ~50% and lifting user engagement.",
      "Mentored 15+ interns through agile practices and code reviews, contributing to a strong intern-to-full-time conversion rate.",
      "Ran code reviews and introduced best practices, improving code quality by ~20% and reducing technical debt across projects.",
      "Recognised as Best Performer of the Month.",
    ],
  },
  {
    id: 4,
    company: "RISS Technologies",
    role: "Associate Software Developer",
    logo: "/rizz_logo_1.jpg",
    period: "May 2022 — June 2023",
    location: "Kozhikode",
    points: [
      "Developed mobile applications using Flutter and native Android.",
      "Built responsive front-ends for 5+ projects using HTML, CSS, JavaScript and Bootstrap.",
      "Designed and maintained MySQL databases with optimised schemas via ORM, integrated with Django — improving data-retrieval efficiency by ~35% and cutting query execution time by ~20%.",
      "Led a process re-engineering effort that consolidated end-to-end service workflows and reduced paperwork by ~75%.",
    ],
  },
  {
    id: 5,
    company: "Trylogic Soft Solutions",
    role: "UI Developer Intern",
    logo: "/trylogic_logo_2.jpg",
    period: "February 2022 — May 2022",
    location: "Kerala",
    points: [],
  },
];

function CompanyLogo({ exp, sizes }: { exp: ExperienceEntry; sizes: string }) {
  if (exp.logo) {
    return (
      <Image src={exp.logo} alt={exp.company} fill sizes={sizes} className="object-contain p-1" />
    );
  }
  const initials = exp.company
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <span
      className="absolute inset-0 flex items-center justify-center text-sm font-extrabold"
      style={{ backgroundColor: "rgba(255,235,18,0.1)", color: "#ffeb12" }}
    >
      {initials}
    </span>
  );
}

export default function Experience() {
  const [active, setActive] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { overlayRef, onMouseMove, onMouseLeave } = useMouseSpotlight();

  return (
    <section
      id="testimonial-section"
      className="relative overflow-hidden py-28 px-6 bg-black"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ opacity: 0, transition: "opacity 0.6s ease" }}
      />
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <motion.div
          ref={ref}
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-[10px] font-semibold tracking-[0.4em] uppercase mb-4"
            style={{ color: "#ffeb12" }}
          >
            Career
          </p>
          <div className="flex items-end gap-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              My Work Experience
            </h2>
            <div className="pb-1.5">
              <Image src="/divider.png" alt="" width={76} height={20} />
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Company selector — left */}
          <div className="lg:w-4/12 flex flex-col gap-1">
            {experiences.map((exp, index) => (
              <button
                key={exp.id}
                onClick={() => setActive(index)}
                className={`text-left px-5 py-5 border-l-2 transition-all duration-300 ${
                  active === index
                    ? "border-[#ffeb12] bg-white/3"
                    : "border-white/8 hover:border-white/25 hover:bg-white/2"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 relative rounded flex-shrink-0 overflow-hidden bg-white/5">
                    <CompanyLogo exp={exp} sizes="40px" />
                  </div>
                  <div className="text-left">
                    <span
                      className={`block text-sm font-bold transition-colors ${
                        active === index ? "text-white" : "text-white/50"
                      }`}
                    >
                      {exp.company}
                    </span>
                    <span className="block text-[10px] text-white/30 mt-0.5 tracking-wide">
                      {exp.period}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Content — right */}
          <div className="lg:w-8/12">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="border border-white/8 p-8 md:p-12 relative"
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, #ffeb12 0%, transparent 60%)",
                  }}
                />

                {/* Role badge */}
                <div className="mb-6">
                  <span
                    className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: "rgba(255,235,18,0.1)",
                      color: "#ffeb12",
                    }}
                  >
                    {experiences[active].role}
                  </span>
                </div>

                {experiences[active].points.length > 0 && (
                  <ul className="flex flex-col gap-3 mb-10">
                    {experiences[active].points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-white/60 font-light leading-relaxed text-sm md:text-base"
                      >
                        <span
                          className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: "#ffeb12" }}
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Company row */}
                <div className="flex items-center gap-5 pt-6 border-t border-white/6">
                  <div
                    className={`w-14 h-14 relative rounded overflow-hidden flex-shrink-0 ${
                      experiences[active].logo ? "bg-white" : ""
                    }`}
                  >
                    <CompanyLogo exp={experiences[active]} sizes="56px" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">
                      {experiences[active].company}
                    </h3>
                    <span className="block text-white/35 text-xs mt-1 tracking-wide">
                      {experiences[active].period} · {experiences[active].location}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
