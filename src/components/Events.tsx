import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Calendar, Users, Cpu, Code2 } from "lucide-react";

interface Event {
  title: string;
  description: string;
  badge: "Planned" | "Coming Soon";
  icon: React.ReactNode;
  date: string;
}

function EventCard({
  event,
  index,
}: {
  event: Event;
  index: number;
  key?: React.Key;
}) {
  const isPlanned = event.badge === "Planned";
  const primaryColorClass = isPlanned ? "border-primary" : "border-gold";
  const badgeBgClass = isPlanned ? "bg-primary" : "bg-gold";

  return (
    <motion.div
      className={`bg-white rounded-2xl p-8 shadow-sm hover:shadow-md border-t-4 ${primaryColorClass} transition-all duration-300 flex flex-col justify-between gap-6 h-full relative overflow-hidden`}
    >
      {/* Decorative background shape */}
      <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 rounded-full bg-slate-50 opacity-60 pointer-events-none group-hover:scale-110 transition-transform" />

      <div className="space-y-4">
        {/* Header containing Badge & Icon */}
        <div className="flex items-center justify-between">
          <span
            className={`text-[9px] md:text-[10px] font-sans font-bold uppercase tracking-wider text-white px-2.5 py-1 rounded-full ${badgeBgClass}`}
          >
            {event.badge}
          </span>
          <div className="text-muted-foreground/60">{event.icon}</div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="font-display text-2xl font-normal text-dark leading-snug">
            {event.title}
          </h3>
          <p className="text-body text-sm text-muted-foreground leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>

      {/* Date detail */}
      <div className="pt-4 border-t border-border flex items-center gap-2 text-xs font-sans text-muted-foreground font-medium">
        <Calendar size={14} className="text-primary/70" />
        <span>{event.date}</span>
      </div>
    </motion.div>
  );
}

export default function Events() {
  const shouldReduceMotion = useReducedMotion();

  const eventList: Event[] = [
    {
      title: "Coding Workshop",
      description:
        "Hands-on intro to programming fundamentals. Open to absolute beginners. Write your first scripts and learn algorithmic logic.",
      badge: "Planned",
      icon: <Code2 size={22} className="text-primary" />,
      date: "Mid-July 2026",
    },
    {
      title: "AI Introduction Webinar",
      description:
        "Explore the basics of machine learning, modern neural networks, and how AI is shaping industrial structures and standard life.",
      badge: "Planned",
      icon: <Cpu size={22} className="text-primary" />,
      date: "August 2026",
    },
    {
      title: "NICS Hackathon",
      description:
        "Our flagship event. High school teams compete to design, draft, and build real digital software solutions within a 24-hour run.",
      badge: "Coming Soon",
      icon: <Code2 size={22} className="text-gold" />,
      date: "Soon",
    },
    {
      title: "School Awareness Program",
      description:
        "NICS team visits various high schools across Nepal to introduce students to digital computing, cybersecurity, and tech fields.",
      badge: "Coming Soon",
      icon: <Users size={22} className="text-gold" />,
      date: "Soon",
    },
  ];

  return (
    <section id="events" className="bg-bg-alt py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <p className="label-eyebrow text-primary font-semibold tracking-[0.15em] mb-3">
            Upcoming Programs
          </p>
          <h2 className="section-heading text-dark mb-4">What's Coming</h2>
          <div className="w-12 h-1 bg-primary rounded" />
        </div>

        {/* Horizontal Scroll/Grid of Event Cards */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {eventList.map((event, idx) => (
            <EventCard key={event.title} event={event} index={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
