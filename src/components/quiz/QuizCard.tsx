import { Quiz, QuizCategory, QuizDifficulty } from "@/types/quiz";
import {
  HelpCircle,
  Clock,
  ArrowRight,
  Binary,
  Code,
  Compass,
  Cpu,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import Link from "next/link";

interface Props {
  quiz: Quiz;
}

const QuizCard = ({ quiz }: Props) => {
  const getCategoryIcon = (category: QuizCategory) => {
    switch (category) {
      case "Coding":
        return <Code className="w-4 h-4 text-primary" />;
      case "AI/ML":
        return <Cpu className="w-4 h-4 text-purple-600" />;
      case "CyberSecurity":
        return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
      case "Systems":
        return <Terminal className="w-4 h-4 text-amber-600" />;
      case "Algorithms":
        return <Binary className="w-4 h-4 text-blue-600" />;
      default:
        return <Compass className="w-4 h-4 text-primary" />;
    }
  };

  const getDifficultyColor = (diff: QuizDifficulty) => {
    switch (diff) {
      case "beginner":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "intermediate":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "advanced":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };
  return (
    <div
      key={quiz.slug}
      className="bg-white rounded-2xl border border-border p-6 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
    >
      {/* Top indicator ribbon */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-gray-50 border border-border/80 group-hover:bg-primary/5 transition-colors">
            {getCategoryIcon(quiz.category)}
          </span>
          <span className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
            {quiz.category}
          </span>
        </div>
        <span
          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getDifficultyColor(
            quiz.difficulty,
          )}`}
        >
          {quiz.difficulty}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-2 mb-6">
        <h3 className="font-display text-lg font-bold text-dark group-hover:text-primary transition-colors leading-snug">
          {quiz.title}
        </h3>
        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">
          {quiz.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {quiz.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-600"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Bottom Metadata & Start Action */}
      <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" />
            {quiz.questions.length} Qs
          </span>
          <span>&middot;</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />~{quiz.timeMinutes}m
          </span>
        </div>

        <Link
          href={`/quiz/${quiz.slug}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-dark text-white text-xs font-semibold group-hover:bg-primary transition-all cursor-pointer shadow-sm"
        >
          <span>Start</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default QuizCard;
