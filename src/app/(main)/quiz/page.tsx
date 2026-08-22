import { QuizExplorer } from "@/components/quiz/QuizExplorer";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllQuizzes } from "@/lib/quizzes";
import { Quiz } from "@/types/quiz";
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Timer,
  Sparkles,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Share2,
  Bookmark,
  Search,
  Code,
  Cpu,
  ShieldCheck,
  Terminal,
  Binary,
  Compass,
  ChevronRight,
  Trophy,
  Zap,
  Copy,
  Check,
  Flame,
  Clock,
  SlidersHorizontal,
} from "lucide-react";
import { motion } from "motion/react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Quizzes",
  description: "Quizzes by NICS.",
};

export default async function QuizPage() {
  const quizzes = await getAllQuizzes();

  return (
    <>
      <main>
        <div className="min-h-screen bg-bg-alt text-dark font-body relative overflow-hidden pt-12 pb-20">
          <div className="absolute right-0 top-0 w-125 h-125 rounded-full bg-primary-light/40 blur-[150px] pointer-events-none" />
          <div className="absolute -left-25 bottom-0 w-100 h-100 rounded-full bg-primary-light/30 blur-[120px] pointer-events-none" />

          <div className="px-6 relative z-10 py-0 mx-auto max-w-6xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
              >
                <ArrowLeft
                  size={16}
                  className="transition-transform group-hover:-translate-x-1"
                />
                Back to homepage
              </Link>
            </div>
            <div className="py-16">
              <div>
                <div>
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h1 className="font-display text-5xl md:text-6xl text-dark tracking-tight leading-tight">
                        NICS <span className="text-primary">Quizzes</span>
                      </h1>
                      <p className="text-body text-muted-foreground max-w-2xl">
                        Interactive, peer-curated quizzes designed by NICS
                        student leads. Test your fundamentals across a wide
                        range of topics in Computer Science and beyond.
                      </p>
                    </div>

                    <Suspense fallback={<Skeleton />}>
                      <QuizExplorer quizzes={quizzes} />
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
