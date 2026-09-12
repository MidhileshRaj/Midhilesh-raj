"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { useMouseSpotlight } from "@/hooks/useMouseSpotlight";

const stats = [
  { value: "4+", label: "Years\nExperience" },
  { value: "3+", label: "CI/CD Projects\nCompleted" },
  { value: "3", label: "Companies\nWorked With" },
  { value: "10+", label: "Freelance\n Works" },
  { value: "20+", label: "Total\n Projects (including personal)" },
  { value: "10+", label: "Interns\n Trained" },
];

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const sectionRef = useRef<HTMLElement>(null);
  const { overlayRef, onMouseMove, onMouseLeave } = useMouseSpotlight();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageParallaxY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section
      ref={sectionRef}
      id="about-section"
      className="relative overflow-hidden py-28 px-6 bg-black"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Mouse spotlight overlay */}
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
            Who I am
          </p>
          <div className="flex items-end gap-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              About Me
            </h2>
            <div className="pb-1.5">
              <Image
                src="/divider.png"
                alt=""
                width={76}
                height={20}
              />
            </div>
          </div>
        </motion.div>

        {/* Content Row */}
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Image */}
          <motion.div
            className="lg:w-5/12"
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="relative overflow-hidden"
              style={{
                backgroundImage: "url('/dotted_light.png')",
                backgroundRepeat: "repeat",
              }}
            >
              {/* Yellow corner accent */}
              <div
                className="absolute top-0 left-0 w-12 h-12 z-10 pointer-events-none"
                style={{
                  borderTop: "3px solid #ffeb12",
                  borderLeft: "3px solid #ffeb12",
                }}
              />
              <div
                className="absolute bottom-0 right-0 w-12 h-12 z-10 pointer-events-none"
                style={{
                  borderBottom: "3px solid #ffeb12",
                  borderRight: "3px solid #ffeb12",
                }}
              />
              <motion.div style={{ y: imageParallaxY }}>
                <Image
                  src="/about_me_pic.jpg"
                  alt="Midhilesh Raj"
                  width={700}
                  height={800}
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="w-full object-cover"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Text + Stats */}
          <motion.div
            className="lg:w-7/12 flex flex-col justify-center"
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-snug">
              We can make it together
            </h3>
            <p className="text-base text-white/60 font-light leading-relaxed mb-4">
              Passionate about coding 🧑‍💻, ECE background{" "}
              <a href="#" style={{ color: "#ffeb12" }} className="hover:opacity-80 transition-opacity">
                IT professional
              </a>{" "}
              here.
            </p>
            <p className="text-white/50 font-light leading-relaxed mb-10 text-sm">
              {`I'm a tech-enthusiast & have a wide variety of knowledge in programming and computer. 💻
              Experience in a variety of coding skills including Flutter and Python.`}
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 mb-10 py-8 border-t border-b border-white/8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  className="text-center"
                >
                  <span
                    className="block text-3xl md:text-4xl font-bold mb-1"
                    style={{ color: "#ffeb12" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/35 whitespace-pre-line leading-relaxed">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="https://drive.google.com/file/d/1K6b5OkTIB8QY3aQuMOq_P7QF5n9jkY1a/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 self-start border border-white/20 text-[11px] font-extrabold uppercase tracking-[0.2em] px-8 py-4 rounded-full transition-all hover:border-[#ffeb12]/60 hover:scale-105 active:scale-95"
              style={{ color: "#ffeb12" }}
              whileHover={{ borderColor: "rgba(255,235,18,0.5)" }}
              whileTap={{ scale: 0.97 }}
            >
              Download my CV
              <span className="text-lg leading-none">↓</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
