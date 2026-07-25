import React from "react";
import { motion } from "motion/react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  key?: React.Key;
}

function FeatureCard({
  title,
  description,
  icon,
  index: _index,
}: FeatureCardProps) {
  return (
    <motion.div className="bg-white border border-border rounded-2xl p-8 transition-all duration-300 shadow-sm hover:shadow-md hover:border-primary flex flex-col items-start gap-5 group">
      {/* Icon Container */}
      <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      {/* Text Info */}
      <div className="space-y-3">
        <h3 className="font-display text-2xl font-normal text-dark group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-body text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function WhatWeDo() {
  const features = [
    {
      title: "Coding & Development",
      description:
        "Learn core software craftsmanship. From web apps with modern stacks to algorithm design and logic, we explore coding from first principles.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      title: "AI & Machine Learning",
      description:
        "Demystify Artificial Intelligence. Understand how language models, computer vision, and neural network algorithms are built, tested, and utilized.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 6v12" />
          <path d="M6 12h12" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: "Cybersecurity & Safety",
      description:
        "Build secure systems and browse safely. Protect yourself and others through hands-on labs exploring cryptography, network protocols, and web security.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      title: "Workshops & Webinars",
      description:
        "Learn on the go. Participate in regular online masterclasses led by experienced peers, guest developers, and tech leads from around Nepal.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
    {
      title: "Community & Events",
      description:
        "Be part of something bigger. Engage in collaborative hackathons, peer review sessions, coding meetups, and future physical venue programs.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="what-we-do"
      className="bg-white py-20 md:py-28 overflow-hidden"
    >
      <div className="max-w-300 mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <p className="label-eyebrow text-primary font-semibold tracking-[0.15em] mb-3">
            What We Do
          </p>
          <h2 className="section-heading text-dark mb-4">
            Everything tech, under one roof.
          </h2>
          <div className="w-12 h-1 bg-primary rounded" />
        </div>

        {/* Feature Cards Grid */}
        <motion.div
          // variants={shouldReduceMotion ? {} : staggerContainer}
          // initial="hidden"
          // whileInView="visible"
          // viewport={{ once: true, margin: "-80px" }}
          className="space-y-6 lg:space-y-8"
        >
          {/* Top Row: 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.slice(0, 3).map((feat, idx) => (
              <FeatureCard
                key={feat.title}
                title={feat.title}
                description={feat.description}
                icon={feat.icon}
                index={idx}
              />
            ))}
          </div>

          {/* Bottom Row: 2 columns centered on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 lg:max-w-4xl lg:mx-auto">
            {features.slice(3, 5).map((feat, idx) => (
              <FeatureCard
                key={feat.title}
                title={feat.title}
                description={feat.description}
                icon={feat.icon}
                index={idx + 3}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
