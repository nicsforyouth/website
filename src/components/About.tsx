import { motion, useReducedMotion } from "motion/react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  // Create variants supporting reduced motion
  const currentFadeInUp = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
      }
    : fadeInUp;

  return (
    <section
      id="about"
      className="bg-bg-alt py-20 md:py-28 overflow-hidden border-y border-border"
    >
      <div className="max-w-300 mx-auto px-6">
        {/* Eyebrow Label */}
        <div className="mb-12">
          <p className="label-eyebrow text-primary font-semibold tracking-[0.15em] mb-3">
            About NICS
          </p>
          <div className="w-12 h-1 bg-primary rounded" />
        </div>

        <motion.div
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
        >
          {/* Left column: Pull Quote with a border */}
          <motion.div
            /* @ts-ignore */
            variants={currentFadeInUp}
            className="lg:col-span-5 border-l-4 border-primary pl-6 py-2"
          >
            <blockquote className="pull-quote text-dark font-display">
              "We're students for students. There are no stiff lecture halls
              here—just peers building the future together."
            </blockquote>
          </motion.div>

          {/* Right column: Paragraphs */}
          <motion.div
            /* @ts-ignore */
            variants={currentFadeInUp}
            className="lg:col-span-7 space-y-6"
          >
            <p className="text-body text-dark/90 leading-relaxed font-normal">
              Nepal Informatics & Computing Society (NICS) was founded by a
              group of high school computer enthusiasts who noticed a gap in the
              Nepali education system: access to real-world, hands-on technology
              education.
            </p>
            <p className="text-body text-muted-foreground leading-relaxed">
              We operate as a peer-to-peer student club, built on the belief
              that high schoolers learn best from other passionate peers. By
              designing our own workshops, bootcamps, and digital sessions, we
              present tech concepts (like web development, neural networks, or
              security tools) in a friendly, approachable way.
            </p>
            <p className="text-body text-muted-foreground leading-relaxed">
              Whether you are an absolute beginner looking to write your very
              first line of code, or a self-taught tinkerer looking for a team
              to collaborate on projects, NICS is your home. Everything we do is
              completely free, student-led, and open to anyone passionate about
              computing.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
