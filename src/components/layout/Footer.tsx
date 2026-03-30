"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61557265365469" },
  { label: "Twitter", href: "https://x.com/MidhileshRaj" },
  { label: "Instagram", href: "https://www.instagram.com/midhileshraj/" },
  { label: "GitHub", href: "https://github.com/MidhileshRaj" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/midhilesh-raj-810092172/" },
];

export default function Footer() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const handleScrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer>
      {/* CTA Band */}
      <div className="bg-[#0d0d0d] border-t border-white/6 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="text-[10px] font-semibold tracking-[0.4em] uppercase mb-5"
              style={{ color: "#ffeb12" }}
            >
              Open to opportunities
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-8">
              Let&apos;s build something
              <br />
              <span className="text-white/30">remarkable together.</span>
            </h2>
            <a
              href="#contact-section"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo("#contact-section");
              }}
              className="inline-flex items-center gap-3 px-10 py-4 text-black font-extrabold text-[11px] tracking-[0.2em] uppercase rounded-full hover:scale-105 active:scale-95 transition-transform"
              style={{ backgroundColor: "#ffeb12" }}
            >
              Get In Touch
              <span className="text-base leading-none">→</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-black border-t border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo */}
            <a
              href="#home-section"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo("#home-section");
              }}
              className="text-lg font-bold tracking-wide"
            >
              <span className="text-white">Midhilesh </span>
              <span style={{ color: "#ffeb12" }}>Raj</span>
              <span className="text-white/30">.</span>
            </a>

            {/* Social Links */}
            <ul className="flex flex-wrap items-center justify-center gap-6">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/25 hover:text-white/70 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Copyright */}
            <p className="text-[10px] text-white/20 tracking-wider">
              © {new Date().getFullYear()} Midhilesh Raj
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
