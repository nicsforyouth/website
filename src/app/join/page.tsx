"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Check,
  ArrowLeft,
  Shield,
  ChevronDown,
  ChevronUp,
  Layers,
  Terminal,
  Users,
  Zap,
  Award,
  Globe,
  FileText,
  X,
  ExternalLink,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { config } from "@/lib/config";
import Link from "next/link";
// import NICSLogo from "./NICSLogo.tsx";

interface JoinPageProps {
  onBackToHome: () => void;
}

export default function JoinPage() {
  const { applicationForm } = config;
  // Custom Google Form Link State
  const [showEmbed, setShowEmbed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const [copiedPassText, setCopiedPassText] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(config.applicationForm);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const faqs = [
    {
      q: "Is there any membership or application fee?",
      a: "No! NICS is completely free for all high school students in Nepal. We operate as an open, student-led non-profit educational community.",
    },
    {
      q: "Can I join if I have no previous coding experience?",
      a: "Yes! We welcome students of all skill levels—from absolute beginners who are curious about tech to experienced self-taught builders. Our peer-mentorship guilds guide you step-by-step.",
    },
    {
      q: "What is the expected weekly time commitment?",
      a: "Most active members spend 2-4 hours per week participating in guild discussions, weekend workshops, or working on collaborative open-source projects.",
    },
    {
      q: "How will I know if my application was accepted?",
      a: "Once you submit the Google Form, our team reviews applications within 48 hours and sends an official invitation email with direct access links to the NICS Discord/Slack community.",
    },
  ];

  return (
    <div className="min-h-screen bg-bg-alt text-dark font-body relative overflow-hidden pt-24 pb-20">
      {/* Background glow effects */}
      <div className="absolute right-0 top-10 w-150 h-[600px] rounded-full bg-primary-light/50 blur-[160px] pointer-events-none" />
      <div className="absolute -left-25 bottom-20 w-125 h-125 rounded-full bg-primary-light/40 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Top Header Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            id="join-back-home-btn"
            href={"/"}
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to homepage
          </Link>

          {/* Active Intake Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary-light text-primary border border-primary/20 rounded-full text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span>Memberships are Open!</span>
          </div>
        </div>
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-block px-3 py-1 bg-white border border-border text-dark text-xs font-semibold rounded-full uppercase tracking-widest shadow-xs">
            Official Membership Registration
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-dark leading-tight tracking-tight">
            Step into Nepal's Next-Gen Computing Society.
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-sans">
            A high-energy, student-led collective building real software, neural
            models, and secure systems across high schools in Nepal.
          </p>

          {/* Stats strip */}
          <div className="pt-4 flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5 font-medium">
              <Users size={15} className="text-primary" /> 250+ Active High
              Schoolers
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Globe size={15} className="text-primary" /> 12+ Districts
              Represented
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Zap size={15} className="text-gold" /> 100% Free & Open Access
            </div>
          </div>
        </div>
        {/* Navigation Tabs */}
        {/* TAB 1: GOOGLE FORM PORTAL */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-10"
        >
          {/* Primary Google Forms CTA Card */}
          <div className="bg-white border border-border rounded-3xl p-8 md:p-12 shadow-xl shadow-black/2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-light text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                  <FileText size={14} /> Direct Registration Link
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-dark font-sans tracking-tight">
                  Submit via Official Google Form
                </h2>

                <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-sans">
                  We process all member applications through Google Forms to
                  ensure verified student data, instant confirmation receipts,
                  and smooth onboarding into our Discord/Slack channels.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Open Form in New Tab */}
                    <a
                      id="google-form-direct-link"
                      href={config.applicationForm}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-text bg-primary hover:bg-primary/95 text-white px-7 py-3.5 rounded-xl transition-all shadow-md shadow-primary/20 hover:shadow-lg flex items-center gap-2 text-base font-semibold"
                    >
                      Open Google Form <ExternalLink size={18} />
                    </a>

                    {/* Toggle Embed View */}
                    <button
                      id="toggle-embed-form-btn"
                      onClick={() => setShowEmbed(!showEmbed)}
                      className="btn-text bg-bg-alt border border-border hover:bg-border/60 text-dark px-5 py-3.5 rounded-xl transition-all flex items-center gap-2 text-sm font-semibold cursor-pointer"
                    >
                      <Layers size={16} />
                      {showEmbed ? "Hide Embedded Form" : "Embed Form Below"}
                    </button>

                    {/* Copy Link Button */}
                    <button
                      id="copy-google-form-link-btn"
                      onClick={handleCopyLink}
                      className="p-3.5 bg-bg-alt border border-border rounded-xl text-dark/80 hover:text-dark hover:border-primary/40 transition-colors cursor-pointer"
                      title="Copy Form URL"
                    >
                      {copiedLink ? (
                        <Check size={18} className="text-primary" />
                      ) : (
                        <Copy size={18} />
                      )}
                    </button>
                  </div>

                  {copiedLink && (
                    <p className="text-xs font-semibold text-primary animate-fade-in">
                      ✓ Google Form URL copied to clipboard!
                    </p>
                  )}
                </div>
              </div>

              {/* Right Side Info Box */}
              <div className="lg:col-span-5 bg-bg-alt border border-border p-6 rounded-2xl space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-sans flex items-center justify-between">
                  <span>Application Checklist</span>
                  <span className="text-primary">4 Steps</span>
                </div>

                <ul className="space-y-3.5 text-xs text-dark/80 font-sans">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2
                      size={16}
                      className="text-primary shrink-0 mt-0.5"
                    />
                    <span>
                      Click <strong>"Open Google Form"</strong> or use the
                      embedded window.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2
                      size={16}
                      className="text-primary shrink-0 mt-0.5"
                    />
                    <span>
                      Enter your full name, high school/college, and primary
                      interest area.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2
                      size={16}
                      className="text-primary shrink-0 mt-0.5"
                    />
                    <span>
                      Write a short sentence about why you want to learn & build
                      with NICS.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2
                      size={16}
                      className="text-primary shrink-0 mt-0.5"
                    />
                    <span>
                      Hit Submit! Our team will send your Discord invite link
                      within 48 hours.
                    </span>
                  </li>
                </ul>

                <div className="p-3 bg-white border border-border rounded-xl text-[11px] text-muted-foreground flex items-center gap-2">
                  <Shield size={14} className="text-primary shrink-0" />
                  <span>
                    Your privacy is protected. Data is strictly used for student
                    verification.
                  </span>
                </div>
              </div>
            </div>

            {/* Embedded Google Form View */}
            {showEmbed && (
              <div className="mt-8 pt-8 border-t border-border animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-dark uppercase tracking-wider font-sans flex items-center gap-2">
                    <Layers size={16} className="text-primary" /> Embedded
                    Google Form Portal
                  </h3>
                  <button
                    onClick={() => setShowEmbed(false)}
                    className="text-xs text-muted-foreground hover:text-dark cursor-pointer flex items-center gap-1"
                  >
                    <X size={14} /> Close Preview
                  </button>
                </div>

                <div className="w-full h-162.5 bg-bg-alt border border-border rounded-2xl overflow-hidden shadow-inner relative">
                  <iframe
                    src={applicationForm}
                    title="NICS Google Form Registration"
                    className="w-full h-full border-none"
                  >
                    Loading Google Form...
                  </iframe>
                </div>
              </div>
            )}
          </div>

          {/* Membership Perks Showcase */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="font-display text-3xl text-dark">
                What You Gain as a NICS Member
              </h3>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-sans font-semibold">
                Zero Financial Cost • High Engineering Impact
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Zap size={22} className="text-primary" />,
                  title: "Flagship Hackathons",
                  desc: "Priority entry and team formation for national student hackathons and code jams.",
                },
                {
                  icon: <Users size={22} className="text-primary" />,
                  title: "Mentorship Guilds",
                  desc: "Direct 1-on-1 guidance from senior computer science students and software engineers.",
                },
                {
                  icon: <Terminal size={22} className="text-gold" />,
                  title: "Cloud & Dev Credits",
                  desc: "Free access to web hosting environments, API sandboxes, and hardware labs.",
                },
                {
                  icon: <Award size={22} className="text-primary" />,
                  title: "Verified Credentials",
                  desc: "Official digital certificate recognizing your project contributions and community rank.",
                },
              ].map((perk, i) => (
                <div
                  key={i}
                  className="bg-white border border-border p-6 rounded-2xl space-y-3 hover:border-primary/30 transition-all shadow-xs"
                >
                  <div className="p-3 bg-primary-light rounded-xl w-fit">
                    {perk.icon}
                  </div>
                  <h4 className="font-sans font-bold text-base text-dark">
                    {perk.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                    {perk.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        ){/* FAQ Accordion Section */}
        <div className="mt-20 border-t border-border pt-16 max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="font-display text-4xl text-dark">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-sans font-semibold">
              Everything you need to know about joining NICS
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-border rounded-2xl overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left font-sans font-bold text-dark text-sm sm:text-base flex items-center justify-between gap-4 cursor-pointer hover:bg-bg-alt/50"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp size={18} className="text-primary shrink-0" />
                    ) : (
                      <ChevronDown
                        size={18}
                        className="text-muted-foreground shrink-0"
                      />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed border-t border-border/40 bg-bg-alt/30">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
