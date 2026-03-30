"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sectionIds = [
  "home-section",
  "about-section",
  "portfolio-section",
  "services-section",
  "skills-section",
  "testimonial-section",
  "community-section",
  "contact-section",
];

const leftNavItems = [
  { label: "Home", href: "#home-section" },
  { label: "About", href: "#about-section" },
  { label: "Projects", href: "#portfolio-section" },
  { label: "Services", href: "#services-section" },
];

const rightNavItems = [
  { label: "Skills", href: "#skills-section" },
  { label: "Experience", href: "#testimonial-section" },
  { label: "Community", href: "#community-section" },
  { label: "Contact", href: "#contact-section" },
];

const allNavItems = [...leftNavItems, ...rightNavItems];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home-section");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const isActive = (href: string) => activeSection === href.slice(1);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/85 backdrop-blur-lg border-b border-white/8 py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Left Nav — desktop */}
            <ul className="hidden lg:flex items-center gap-8 flex-1">
              {leftNavItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-[11px] font-semibold tracking-[0.18em] uppercase transition-all duration-300 relative group ${
                      isActive(item.href)
                        ? "text-[#ffeb12]"
                        : "text-white/55 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-[#ffeb12] transition-all duration-300 ${
                        isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>

            {/* Center Logo */}
            <div className="flex-shrink-0 text-center">
              <a
                href="#home-section"
                onClick={(e) => handleNavClick(e, "#home-section")}
                className="text-base font-bold tracking-wide"
              >
                <span className="text-white">Midhilesh </span>
                <span style={{ color: "#ffeb12" }}>Raj</span>
                <span className="text-white/40">.</span>
              </a>
            </div>

            {/* Right Nav — desktop */}
            <ul className="hidden lg:flex items-center gap-8 flex-1 justify-end">
              {rightNavItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-[11px] font-semibold tracking-[0.18em] uppercase transition-all duration-300 relative group ${
                      isActive(item.href)
                        ? "text-[#ffeb12]"
                        : "text-white/55 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-[#ffeb12] transition-all duration-300 ${
                        isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Menu button */}
            <button
              className="lg:hidden text-white/70 hover:text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              Menu
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28 }}
              className="fixed top-0 right-0 h-full w-72 bg-[#0a0a0a] border-l border-white/8 z-50 flex flex-col py-10 px-8"
            >
              {/* Mobile header */}
              <div className="flex justify-between items-center mb-12">
                <span className="text-base font-bold">
                  <span className="text-white">Midhilesh </span>
                  <span style={{ color: "#ffeb12" }}>Raj</span>
                  <span className="text-white/40">.</span>
                </span>
                <button
                  className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors text-2xl leading-none"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  &times;
                </button>
              </div>

              <ul className="flex flex-col gap-6">
                {allNavItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors flex items-center gap-3 ${
                        isActive(item.href)
                          ? "text-[#ffeb12]"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      {isActive(item.href) && (
                        <span
                          className="w-4 h-px flex-shrink-0"
                          style={{ backgroundColor: "#ffeb12" }}
                        />
                      )}
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* Bottom contact CTA */}
              <div className="mt-auto pt-8 border-t border-white/8">
                <a
                  href="#contact-section"
                  onClick={(e) => handleNavClick(e, "#contact-section")}
                  className="block text-center text-[11px] font-bold tracking-[0.18em] uppercase py-3 rounded-full border border-[#ffeb12]/40 transition-colors hover:border-[#ffeb12]"
                  style={{ color: "#ffeb12" }}
                >
                  Get In Touch
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
