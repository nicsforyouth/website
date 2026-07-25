import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import ParticleCanvas from "./ParticleCanvas";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface HeroProps {
  onJoinClick: () => void;
  onExploreClick: () => void;
  onScrollClick: () => void;
}

export default function Hero({
  onJoinClick,
  onExploreClick,
  onScrollClick,
}: HeroProps) {
  const shouldReduceMotion = useReducedMotion();

  const currentFadeInUp = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
      }
    : fadeInUp;

  return (
    <section
      id="home"
      className="relative w-full min-h-svh flex flex-col justify-center items-center overflow-hidden bg-white px-6 pt-20"
    >
      {/* Background Particle Canvas */}
      <div className="absolute inset-0 z-0">
        <ParticleCanvas />
      </div>

      {/* Decorative gradient overlay for subtle vignette */}
      <div className="absolute inset-0 z-0 bg-radial-[circle_at_center,transparent_40%,rgba(255,255,255,0.7)_90%]" />

      {/* Hero content */}
      <div className="relative z-10 max-w-225 text-center flex flex-col items-center">
        <motion.div
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.p
            /* @ts-ignore */
            variants={currentFadeInUp}
            className="label-eyebrow text-primary font-semibold mb-6 tracking-[0.15em] uppercase text-xs md:text-sm bg-primary-light px-4 py-1.5 rounded-full"
          >
            Nepal Informatics & Computing Society
          </motion.p>

          <motion.h1
            /* @ts-ignore */
            variants={currentFadeInUp}
            className="hero-headline text-dark mb-6 tracking-tight max-w-212.5 font-display"
          >
            Nepal's next generation of tech starts here.
          </motion.h1>

          <motion.p
            /* @ts-ignore */
            variants={currentFadeInUp}
            className="text-body text-muted-foreground mb-10 max-w-160 text-base md:text-lg lg:text-xl font-normal leading-relaxed"
          >
            A student-run club dedicated to helping high schoolers across Nepal
            discover AI, coding, cybersecurity, and more.
          </motion.p>

          <motion.div
            /* @ts-ignore */
            variants={currentFadeInUp}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto"
          >
            <button
              id="hero-join-btn"
              onClick={onJoinClick}
              className="btn-text bg-primary text-white px-8 py-4 rounded-full text-base hover:bg-primary/90 transition-all duration-200 w-full sm:w-auto shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/25 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Join the Club
            </button>
            <button
              id="hero-explore-btn"
              onClick={onExploreClick}
              className="btn-text bg-white border-2 border-dark text-dark px-8 py-4 rounded-full text-base hover:bg-dark hover:text-white transition-all duration-200 w-full sm:w-auto cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Explore What We Do
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
        <span className="text-body text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-bold mb-2">
          Scroll Down
        </span>
        <motion.button
          id="hero-scroll-indicator"
          onClick={onScrollClick}
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "easeInOut",
          }}
          className="text-muted-foreground hover:text-primary transition-colors p-1 rounded-full cursor-pointer"
          aria-label="Scroll to What We Do"
        >
          <ChevronDown size={20} />
        </motion.button>
      </div>
    </section>
  );
}
