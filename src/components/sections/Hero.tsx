"use client";

import { useRef, Suspense, lazy, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";

const HeroCanvas = lazy(() => import("@/components/canvas/HeroCanvas"));

const roles = ["Flutter Developer", "Web Developer", "Python Developer"];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/MidhileshRaj" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/midhilesh-raj-810092172/" },
  { label: "Twitter", href: "https://x.com/MidhileshRaj" },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 180]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleScrollDown = () => {
    document.querySelector("#about-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      id="home-section"
      className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: bgY, scale: 1.0 }}
      >
        <Image
          src="/about_me_pic.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          style={{ objectPosition: "center 20%" }}
          sizes="100vw"
        />
      </motion.div>

      {/* Layered overlays for depth */}
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,235,18,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Three.js Canvas */}
      <Suspense fallback={null}>
        <HeroCanvas />
      </Suspense>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Eyebrow label */}
        <motion.p
          className="text-[10px] font-semibold tracking-[0.4em] uppercase mb-6"
          style={{ color: "#ffeb12" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Portfolio — Software Developer
        </motion.p>

        {/* Main heading */}
        <motion.h1
          className="text-[3.2rem] sm:text-[4.5rem] md:text-[6.5rem] font-bold leading-[0.9] tracking-tight text-white mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Midhilesh
          <br />
          <span className="text-white/40">Raj</span>
        </motion.h1>

        {/* Cycling role text */}
        <motion.div
          className="flex items-center justify-center gap-2 mb-10 h-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span className="text-white/40 text-sm font-light">I&apos;m a</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="text-sm font-bold tracking-wide"
              style={{ color: "#ffeb12" }}
            >
              {roles[roleIndex]}
            </motion.span>
          </AnimatePresence>
          <span className="text-white/40 text-sm font-light">based in Kerala</span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          <a
            href="#portfolio-section"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#portfolio-section")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3.5 text-black font-extrabold text-[11px] tracking-[0.2em] uppercase rounded-full hover:scale-105 active:scale-95 transition-transform"
            style={{ backgroundColor: "#ffeb12" }}
          >
            View My Work
          </a>
          <a
            href="https://drive.google.com/file/d/1K6b5OkTIB8QY3aQuMOq_P7QF5n9jkY1a/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 border border-white/25 text-white font-extrabold text-[11px] tracking-[0.2em] uppercase rounded-full hover:border-white hover:scale-105 active:scale-95 transition-all"
          >
            Download CV
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          {socialLinks.map((link, i) => (
            <span key={link.label} className="flex items-center gap-2">
              {i > 0 && <span className="text-white/15 text-xs">·</span>}
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/30 hover:text-white/70 transition-colors"
              >
                {link.label}
              </a>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about-section"
        onClick={(e) => {
          e.preventDefault();
          handleScrollDown();
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-label="Scroll down"
      >
        <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5">
          <motion.div
            className="w-0.5 h-1.5 bg-white/50 rounded-full"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          />
        </div>
        <span className="text-[9px] tracking-[0.3em] uppercase">Scroll</span>
      </motion.a>
    </section>
  );
}
