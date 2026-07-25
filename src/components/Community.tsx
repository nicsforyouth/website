import { motion, useReducedMotion } from "motion/react";

import { staggerContainer } from "@/lib/animations";
import { Send, FileText, Sparkles } from "lucide-react";
import { config } from "@/lib/config";
import Link from "next/link";

export default function Community() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="community"
      className="bg-white py-20 md:py-28 overflow-hidden relative"
    >
      {/* Background vector glow decoration */}
      <div className="absolute right-0 bottom-0 w-100 h-100 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute left-0 top-0 w-75 h-75 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="max-w-300 mx-auto px-6 relative z-10">
        <motion.div
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-16"
        >
          {/* Header Area */}
          <motion.div className="max-w-175 space-y-4">
            <p className="label-eyebrow text-primary font-semibold tracking-[0.15em] mb-3">
              Become a Member
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-normal tracking-tight">
              Be part of something building.
            </h2>
            <p className="text-body text-gray-400 max-w-150 font-normal">
              NICS is free to join and open to every high schooler in Nepal.
              Come learn, build, share, and connect with other passionate peers.
            </p>
          </motion.div>

          {/* Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Discord card */}
            <motion.div className="bg-white/5 backdrop-blur-md border border-black/5 shadow-xl rounded-2xl p-8 flex flex-col justify-between items-start gap-8 hover:border-primary/40 transition-all duration-300">
              <div className="space-y-5">
                {/* Discord simplified logo */}
                <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 127.14 96.36"
                    fill="currentColor"
                  >
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,52.48,6.83,77.19,77.19,0,0,0,49.18,0,105.15,105.15,0,0,0,18.74,8.07C-1.64,38.58-7.12,68.43,4.64,95.44A105.82,105.82,0,0,0,35.14,111a77.6,77.6,0,0,0,6.44-10.51,69.59,69.59,0,0,1-10.15-4.85c.86-.63,1.68-1.3,2.47-2a68.36,68.36,0,0,0,65.68,0c.79.7,1.61,1.37,2.47,2a69.59,69.59,0,0,1-10.15,4.85,77.6,77.6,0,0,0,6.44,10.51,105.82,105.82,0,0,0,30.5-15.56C135.26,68.43,129.78,38.58,107.7,8.07ZM42.45,75.69C36.21,75.69,31,70,31,63s5.17-12.65,11.41-12.65S53.84,56,53.84,63,48.69,75.69,42.45,75.69Zm42.24,0C78.45,75.69,73.28,70,73.28,63s5.17-12.65,11.41-12.65S96.1,56,96.1,63,91,75.69,84.69,75.69Z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-normal">
                    Join our Discord
                  </h3>
                  <p className="text-body text-sm text-muted-foreground">
                    Interact directly with members. Discuss hardware setups,
                    share projects, ask coding questions, or coordinate with
                    regional groups.
                  </p>
                </div>
              </div>
              <Link
                href={config.social.discord}
                id="join-discord-btn"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-text bg-primary hover:bg-primary/90 px-6 py-3 text-white rounded-full flex items-center gap-2 cursor-pointer transition-all border border-primary/20"
              >
                Join Server <Send size={14} />
              </Link>
            </motion.div>

            {/* Membership card */}
            <motion.div className="bg-white/5 backdrop-blur-md border border-black/5 shadow-xl rounded-2xl p-8 flex flex-col justify-between items-start gap-8 hover:border-primary/40 transition-all duration-300">
              <div className="space-y-5">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                  <FileText size={24} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-normal">
                    Apply for Membership
                  </h3>
                  <p className="text-body text-sm text-muted-foreground">
                    Get priority invitations to all physical workshops,
                    webinars, local development teams, and future hackathons. It
                    is free. Always.
                  </p>
                </div>
              </div>
              <Link
                href={config.applicationForm}
                id="apply-membership-btn"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent hover:bg-black/10 border border-black/20 px-6 py-3 rounded-full flex items-center gap-2 cursor-pointer transition-all"
              >
                Apply Now <Sparkles size={14} className="text-gold" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
