"use client";

import { useState, useEffect } from "react";
import HeroNavbar from "@/components/HeroNavbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WhatWeDo from "@/components/WhatWeDo";
import Marquee from "@/components/Marquee";
import Events from "@/components/Events";
import Community from "@/components/Community";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  // Smooth scroll logic
  const smoothScroll = (itemId: string) => {
    const section = document.getElementById(itemId);
    if (section) {
      // Offset for sticky navbar (appx 80px)
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = section.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(itemId);
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const sections = ["home", "about", "what-we-do", "events", "community"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // adding offset for detection

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="app-container"
      className="min-h-screen bg-white text-dark antialiased"
    >
      <HeroNavbar smoothScroll={smoothScroll} activeSection={activeSection} />

      <main id="main-content">
        <Hero
          onJoinClick={() => smoothScroll("community")}
          onExploreClick={() => smoothScroll("what-we-do")}
          onScrollClick={() => smoothScroll("about")}
        />

        <About />

        <WhatWeDo />

        <Marquee />

        <Events />

        <Community />
      </main>

      <Footer />
    </div>
  );
}
