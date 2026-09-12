"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { useMouseSpotlight } from "@/hooks/useMouseSpotlight";

const experiences = [
  {
    id: 1,
    company: "Occazone Pvt. Ltd.",
    role: "Sr. Flutter Developer",
    logo: "/occazone_img.jpg",
    period: "October 2025 — Current",
    location: "Thiruvananthapuram",
    quote:
      "Served as a Senior Software Development Engineer, leading a team of 5 developers in building and managing the WhenYou Event App. Directed cross-platform development (iOS and Android), ensuring efficient team collaboration, timely delivery, and high-quality application performance",
  },
  {
    id: 2,
    company: "Futura Labs",
    role: "Mobile & Web Developer",
    logo: "/futura_logo_1.jpg",
    period: "June 2023 — Present",
    location: "Kozhikode",
    quote:
      "As a mobile and web app developer, I've excelled in creating Dart APIs using the Shelf package and harnessing Firebase for authentication and data storage. Recognised as the best performer of the month, I've also mentored interns, advocated for best practices, and developed Flutter applications with efficient state management using GetX and Provider.",
  },
  {
    id: 3,
    company: "Rizz Technologies",
    role: "Flutter & Python Developer",
    logo: "/rizz_logo_1.jpg",
    period: "May 2022 — June 2023",
    location: "Kozhikode",
    quote:
      "With a versatile skill set encompassing Python and Flutter development, I've not only contributed to diverse projects but also mentored numerous interns and junior colleagues. Additionally, I've played a pivotal role in developing various private academic projects, utilising my expertise in Flutter and Python to drive innovation and success.",
  },
];

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
                    <Image
                      src={exp.logo}
                      alt={exp.company}
                      fill
                      sizes="40px"
                      className="object-contain p-1"
                    />
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

                <span className="block text-[#ffeb12] text-xl mb-5 tracking-widest">
                  ••••
                </span>

                <blockquote className="text-white/60 font-light leading-relaxed text-sm md:text-base mb-10">
                  {experiences[active].quote}
                </blockquote>

                {/* Author row */}
                <div className="flex items-center gap-5 pt-6 border-t border-white/6">
                  <div className="w-14 h-14 relative rounded overflow-hidden bg-white flex-shrink-0">
                    <Image
                      src={experiences[active].logo}
                      alt={experiences[active].company}
                      fill
                      sizes="56px"
                      className="object-contain p-1"
                    />
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
