"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { useMouseSpotlight } from "@/hooks/useMouseSpotlight";

type ShippedApp = {
  id: number;
  num: string;
  title: string;
  client: string;
  category: string;
  description: string;
  tech: string[];
  icon?: string;
  links: { label: string; url: string }[];
};

const shippedApps: ShippedApp[] = [
  {
    id: 1,
    num: "01",
    title: "Occazone",
    client: "Occazone Pvt. Ltd.",
    category: "Event Services Marketplace",
    description:
      "Event booking and planning platform where users self-book event services end to end — convention halls, caterers, photographers, makeover studios and transport — with an integrated direct payment gateway. Built the complete app architecture and production app single-handedly, including Cashfree Easy Split multi-vendor payments and Firebase Cloud Messaging for booking updates.",
    tech: ["Flutter", "Cashfree", "FCM", "Android", "iOS"],
    icon: "/projects/occazone.png",
    links: [
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.occazone.whenyou" },
      { label: "App Store", url: "https://apps.apple.com/in/app/occazone/id6758567677" },
      { label: "Website", url: "https://www.occazone.com" },
    ],
  },
  {
    id: 2,
    num: "02",
    title: "Occazone Drive",
    client: "Occazone Pvt. Ltd.",
    category: "Driver Trip Management",
    description:
      "Companion driver app for Occazone's Tours & Travels package-booking module. A lightweight app that lets registered drivers update trip status in real time — starting and ending rides with secure customer codes — keeping both customers and vendors informed.",
    tech: ["Flutter", "Android"],
    icon: "/projects/occazone-driver.jpg",
    links: [
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.occazone.driversApp" },
    ],
  },
  {
    id: 3,
    num: "03",
    title: "JoinMeds",
    client: "Freelance · Medland",
    category: "Healthcare Job Platform",
    description:
      "Job-finding app built exclusively for the medical field, supporting both personal and public job search. Healthcare professionals build profiles and apply to roles, while hospitals and clinics post openings and hire faster. Live on the App Store and Google Play.",
    tech: ["Flutter", "Android", "iOS"],
    icon: "/projects/joinmeds.png",
    links: [
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.joinmeds.app" },
      { label: "App Store", url: "https://apps.apple.com/in/app/joinmeds/id6760744098" },
      { label: "Website", url: "https://joinmeds.in" },
    ],
  },
  {
    id: 4,
    num: "04",
    title: "Raitha Sahayak",
    client: "Ecochoice Naturals Pvt. Ltd.",
    category: "AI Farm-Produce Quality Checking",
    description:
      "Marketplace connecting farmers and buyers with AI-based quality assurance — capturing images and details of produce to generate AI quality reports. Owned overall app functionality, plus ML model training support, image labelling, website updates and server-side work.",
    tech: ["Flutter", "Python", "AI / ML", "Android"],
    icon: "/projects/raitha-sahayak.png",
    links: [
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=in.ecochoice.raithasahayak" },
    ],
  },
  {
    id: 5,
    num: "05",
    title: "Krishi Connect",
    client: "Ecochoice Naturals Pvt. Ltd.",
    category: "B2B Farmer-Buyer Marketplace",
    description:
      "B2B platform connecting buyers directly with farmers. Integrated Firebase Authentication and cloud photo retrieval for AI batch results, using Provider for state management — reducing complaints and boosting engagement by ~30%.",
    tech: ["Flutter", "Firebase", "Provider", "Android"],
    links: [],
  },
];

function AppCard({ app, index }: { app: ShippedApp; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  const initials = app.title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col border border-white/8 bg-white/2 p-6 md:p-7 transition-colors duration-300 hover:border-white/20"
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-40 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(90deg, #ffeb12 0%, transparent 60%)" }}
      />

      {/* Icon + number */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
          {app.icon ? (
            <Image
              src={app.icon}
              alt={`${app.title} app icon`}
              fill
              sizes="56px"
              className="object-cover"
            />
          ) : (
            <span
              className="absolute inset-0 flex items-center justify-center text-lg font-extrabold"
              style={{ backgroundColor: "rgba(255,235,18,0.1)", color: "#ffeb12" }}
            >
              {initials}
            </span>
          )}
        </div>
        <span
          className="text-[10px] font-extrabold tracking-[0.2em]"
          style={{ color: "#ffeb12" }}
        >
          {app.num}
        </span>
      </div>

      <h3 className="text-white text-xl font-bold leading-tight">{app.title}</h3>
      <p className="text-white/35 text-xs mt-1 tracking-wide">
        {app.client} · {app.category}
      </p>

      <p className="text-white/60 font-light text-sm leading-relaxed mt-4 mb-5">
        {app.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {app.tech.map((t) => (
          <span
            key={t}
            className="text-[9px] font-bold tracking-[0.15em] uppercase px-2 py-1 rounded"
            style={{ backgroundColor: "rgba(255,235,18,0.15)", color: "#ffeb12" }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Store / website links */}
      {app.links.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-2 pt-5 border-t border-white/6">
          {app.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-2 border border-white/12 text-white/70 hover:text-black hover:bg-[#ffeb12] hover:border-[#ffeb12] transition-colors"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
    </motion.article>
  );
}

const portfolioItems = [
  {
    id: 1,
    num: "01",
    title: "Music Player",
    category: "Mobile · Entertainment",
    tech: ["Flutter", "Dart"],
    image: "/work_2_md.jpg",
    githubUrl: "https://github.com/MidhileshRaj/music-player-Demo",
  },
  {
    id: 2,
    num: "02",
    title: "Care Hand",
    category: "Web · Relief Centre",
    tech: ["Web", "Firebase"],
    image: "/work_8_md.jpg",
    githubUrl: "https://github.com/MidhileshRaj/Reliefe-centre-management",
  },
  {
    id: 3,
    num: "03",
    title: "Tic Tac Toe",
    category: "2D Game · Fun",
    tech: ["Flutter", "Dart"],
    image: "/work_6_md.jpg",
    githubUrl: "https://github.com/MidhileshRaj/TicTacToe-Game",
  },
  {
    id: 4,
    num: "04",
    title: "Web Portfolio",
    category: "Web · Animated",
    tech: ["HTML", "CSS", "JS"],
    image: "/work_4_full.jpg",
    githubUrl: "https://github.com/MidhileshRaj/Midhilesh-Raj-web",
  },
  {
    id: 5,
    num: "05",
    title: "Weather App",
    category: "Live Weather · Themes",
    tech: ["Flutter", "API"],
    image: "/work_7_a_md.jpg",
    githubUrl: "https://github.com/MidhileshRaj/weather-app",
  },
];

function PortfolioCard({
  item,
  index,
}: {
  item: (typeof portfolioItems)[0];
  index: number;
}) {
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  const cardRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 250, damping: 28 });
  const springRotateY = useSpring(rotateY, { stiffness: 250, damping: 28 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotateY.set(((e.clientX - cx) / (rect.width / 2)) * 8);
    rotateX.set(-((e.clientY - cy) / (rect.height / 2)) * 8);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={inViewRef}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200 }}
      className="col-span-1"
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden cursor-pointer group"
      >
        <a
          href={item.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {/* Image */}
          <Image
            src={item.image}
            alt={item.title}
            width={600}
            height={450}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="w-full object-cover transition-transform duration-700 group-hover:scale-108"
          />

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10 flex flex-col justify-end p-6">
            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {item.tech.map((t) => (
                <span
                  key={t}
                  className="text-[9px] font-bold tracking-[0.15em] uppercase px-2 py-1 rounded"
                  style={{ backgroundColor: "rgba(255,235,18,0.15)", color: "#ffeb12" }}
                >
                  {t}
                </span>
              ))}
            </div>
            <h3 className="text-white text-xl font-bold leading-tight">{item.title}</h3>
            <p className="text-white/50 text-xs mt-1 tracking-wide">{item.category}</p>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/60">
                View on GitHub
              </span>
              <span className="text-white/60 text-sm">→</span>
            </div>
          </div>

          {/* Project number — always visible top-left */}
          <div className="absolute top-4 left-4 z-20">
            <span
              className="text-[10px] font-extrabold tracking-[0.2em]"
              style={{ color: "#ffeb12" }}
            >
              {item.num}
            </span>
          </div>
        </a>

        {/* 3D shine layer */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-30"
          style={{
            background:
              "linear-gradient(115deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0) 65%)",
            rotateX: springRotateX,
            rotateY: springRotateY,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { overlayRef, onMouseMove, onMouseLeave } = useMouseSpotlight();

  return (
    <section
      id="portfolio-section"
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
        {/* Header */}
        <motion.div
          ref={ref}
          className="mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-[10px] font-semibold tracking-[0.4em] uppercase mb-4"
            style={{ color: "#ffeb12" }}
          >
            My Work
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Projects
          </h2>
        </motion.div>

        {/* Shipped apps */}
        <h3 className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/50 mb-6">
          Shipped Apps
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {shippedApps.map((app, index) => (
            <AppCard key={app.id} app={app} index={index} />
          ))}
        </div>

        {/* GitHub repositories */}
        <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
          <h3 className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/50">
            Repositories
          </h3>
          <a
            href="https://github.com/MidhileshRaj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/30 hover:text-white/70 transition-colors flex items-center gap-2"
          >
            All on GitHub <span>→</span>
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolioItems.map((item, index) => (
            <PortfolioCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
