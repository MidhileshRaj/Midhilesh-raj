"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { useMouseSpotlight } from "@/hooks/useMouseSpotlight";

const communities = [
  { id: 1, name: "Google Developer Community", logo: "/GDC.png" },
  { id: 2, name: "Stack Overflow", logo: "/overflow.png" },
  { id: 3, name: "Medium", logo: "/medium.png" },
  { id: 4, name: "GitHub", logo: "/git.png" },
];

export default function Community() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { overlayRef, onMouseMove, onMouseLeave } = useMouseSpotlight();

  return (
    <section
      id="community-section"
      className="relative overflow-hidden py-24 px-6 bg-black"
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
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Community
          </h2>
          <Image
            src="/divider.png"
            alt="divider"
            width={76}
            height={20}
            className="mx-auto"
          />
        </motion.div>

        {/* Logo Carousel */}
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 mt-8">
          {communities.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative h-14 w-36 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={item.logo}
                alt={item.name}
                fill
                sizes="144px"
                className="object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
