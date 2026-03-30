"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { useMouseSpotlight } from "@/hooks/useMouseSpotlight";

const services = [
  {
    id: 1,
    icon: "/svg/001-options.svg",
    title: (
      <>
        App <br /> Strategy
      </>
    ),
    description:
      "Developing robust digital strategies with Flutter to elevate your brand, enhance user experiences. Transform your vision into reality with seamless, cross-platform solutions.",
  },
  {
    id: 2,
    icon: "/svg/002-chat.svg",
    title: (
      <>
        Web <br /> Development
      </>
    ),
    description:
      "Crafting dynamic, responsive websites to elevate your online presence and drive business growth.",
  },
  {
    id: 3,
    icon: "/svg/003-contact-book.svg",
    title: (
      <>
        Android <br /> Applications
      </>
    ),
    description:
      "Elevating Android app experiences with Flutter's versatility. Let's create immersive, cross-platform solutions tailored to your vision",
  },
  {
    id: 4,
    icon: "/svg/004-percentage.svg",
    title: (
      <>
        Python Project <br /> Development
      </>
    ),
    description:
      "Creative ideas into reality through Python. Let's collaborate to develop innovative projects that bring value and efficiency to your business.",
  },
  {
    id: 5,
    icon: "/svg/006-goal.svg",
    title: (
      <>
        iOS <br /> App Development
      </>
    ),
    description:
      "Revolutionize iOS experiences with Flutter's versatility. Let's build immersive, cross-platform solutions implementation",
  },
  {
    id: 6,
    icon: "/svg/005-line-chart.svg",
    title: (
      <>
        Embedded <br /> Applications
      </>
    ),
    description:
      "Empowering devices with Flutter's flexibility. Let's innovate together to create seamless embedded applications.",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -10 }}
      style={{ transition: "box-shadow 0.3s ease" }}
      className="p-8 border border-white/10 hover:border-[#ffeb12]/30 hover:shadow-[0_16px_40px_rgba(255,235,18,0.08)] transition-colors duration-300 group relative overflow-hidden"
    >
      {/* Subtle top-edge glow on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ffeb12]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

      <motion.div
        className="mb-4"
        whileHover={{ scale: 1.18, rotate: 6 }}
        transition={{ type: "spring", stiffness: 350, damping: 18 }}
      >
        <Image
          src={service.icon}
          alt=""
          width={45}
          height={45}
          className="object-contain"
          style={{ filter: "invert(1)" }}
        />
      </motion.div>
      <h3 className="text-white font-bold text-xl mb-4 group-hover:text-[#ffeb12] transition-colors duration-300">
        {service.title}
      </h3>
      <p className="text-gray-400 font-light leading-relaxed text-sm">
        {service.description}
      </p>
    </motion.div>
  );
}

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { overlayRef, onMouseMove, onMouseLeave } = useMouseSpotlight();

  return (
    <section
      id="services-section"
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
            My Services
          </h2>
          <Image
            src="/divider.png"
            alt="divider"
            width={76}
            height={20}
            className="mx-auto"
          />
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
