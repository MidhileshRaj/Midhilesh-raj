import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgressBar from "@/components/layout/ScrollProgressBar";
import CustomCursor from "@/components/ui/CustomCursor";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Portfolio from "@/components/sections/Portfolio";
import Services from "@/components/sections/Services";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Community from "@/components/sections/Community";
import Contact from "@/components/sections/Contact";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SOCIAL_PROFILES } from "@/lib/site";

const personId = `${SITE_URL}/#person`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: SITE_NAME,
      givenName: "Midhilesh",
      familyName: "Raj",
      url: SITE_URL,
      image: `${SITE_URL}/about_me_pic.jpg`,
      jobTitle: "Mobile App Development Lead",
      description: SITE_DESCRIPTION,
      worksFor: {
        "@type": "Organization",
        name: "Occazone Pvt. Ltd.",
        url: "https://www.occazone.com",
      },
      alumniOf: { "@type": "CollegeOrUniversity", name: "Capital University" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kannur",
        addressRegion: "Kerala",
        addressCountry: "IN",
      },
      knowsAbout: [
        "Flutter",
        "Dart",
        "Mobile App Development",
        "Android",
        "iOS",
        "Firebase",
        "Python",
        "Django",
        "REST APIs",
        "Software Engineering",
      ],
      sameAs: SOCIAL_PROFILES,
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: `${SITE_NAME} – Portfolio`,
      mainEntity: { "@id": personId },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": personId },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Services />
        <Skills />
        <Experience />
        <Community />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
