"use client";

import { cn, formatTime } from "@/lib/utils";
import { Quiz } from "@/types/quiz";
import { ArrowLeft, Timer, ArrowRight, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import QuizResults from "./QuizResults";
import Link from "next/link";

export type UserAnswers = Record<string, number | undefined>;

const QuizViewBox = ({ quiz }: { quiz: Quiz }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeInseconds, setTimeInseconds] = useState(0);

  const question = quiz.questions[questionIndex];

  const reset = () => {
    setQuestionIndex(0);
    setUserAnswers(
      Object.fromEntries(quiz.questions.map((que) => [que.id, undefined])),
    );
    setTimeInseconds(0);
    setIsCompleted(false);
  };

  useEffect(() => {
    setUserAnswers(
      Object.fromEntries(quiz.questions.map((que) => [que.id, undefined])),
    );
  }, []);

  useEffect(() => {
    if (isCompleted) return;

    const interval = setInterval(() => {
      setTimeInseconds((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isCompleted]);

  if (!question) return;

  function toggleOption(queId: string, answerIndex: number | undefined) {
    setUserAnswers({
      ...userAnswers,
      [queId]: userAnswers[queId] === answerIndex ? undefined : answerIndex,
    });
  }

  function handleFinishQuiz() {
    setIsCompleted(true);
  }

  function onRetake() {
    reset();
  }

  return (
    <div className="max-w-3xl mx-auto">
      {!isCompleted ? (
        <>
          <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
            <div className="flex items-center justify-between">
              <Link
                prefetch
                href="/quiz"
                className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
              >
                <ArrowLeft
                  size={16}
                  className="transition-transform group-hover:-translate-x-1"
                />
                Back to Quizzes
              </Link>
            </div>
            <div className="flex items-center justify gap-1.5 px-3 py-1 rounded-full bg-white border border-border text-xs font-mono text-dark shadow-sm">
              <Timer className="w-3.5 h-3.5 text-primary" />
              <span>{formatTime(timeInseconds)}</span>
            </div>
          </div>

          {/* Quiz Info Header */}
          <div className="mb-6">
            <p className="text-center font-semibold text-primary text-xs uppercase tracking-wider font-mono mb-2">
              {quiz.category} &middot; {quiz.title}
            </p>

            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{
                  width: `${((questionIndex + 1) / quiz.questions.length) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Quick Jump Ribbon */}
          <div className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-2 scrollbar-none">
            {quiz.questions.map((ques, qIdx) => {
              const isAnswered = userAnswers[ques.id] !== undefined;
              const isCurrent = questionIndex === qIdx;

              return (
                <button
                  key={qIdx}
                  onClick={() => setQuestionIndex(qIdx)}
                  className={`w-8 h-8 rounded-lg text-xs font-mono font-semibold flex items-center justify-center transition-all cursor-pointer relative ${
                    isCurrent
                      ? "bg-dark text-white border-2 border-primary"
                      : isAnswered
                        ? "bg-primary/15 text-primary border border-primary/30"
                        : "bg-white text-muted-foreground border border-border hover:bg-gray-50"
                  }`}
                >
                  {qIdx + 1}
                </button>
              );
            })}
          </div>

          {/* Main Question Card */}
          {(() => {
            return (
              <div className="bg-white rounded-3xl border border-border p-6 md:p-8 shadow-sm mb-6">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-dark mb-5 leading-snug">
                  {question.question}
                </h2>

                {/* Code snippet if present */}
                {question.codeSnippet && (
                  <div className="mb-6 rounded-2xl bg-[#0D1117] text-gray-200 p-4 font-mono text-xs border border-white/10 overflow-x-auto relative group">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[10px] text-gray-400">
                      <span>Code Reference</span>
                    </div>
                    <pre className="leading-relaxed">
                      <code>{question.codeSnippet}</code>
                    </pre>
                  </div>
                )}

                {/* Options List */}
                <div className="space-y-3">
                  {question.options.map((option, optIdx) => {
                    const letter = String.fromCharCode(65 + optIdx);

                    return (
                      <button
                        key={optIdx}
                        onClick={() => toggleOption(question.id, optIdx)}
                        // className={` `}
                        className={cn(
                          "bg-white hover:border-primary/40 text-dark w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 group ",
                          userAnswers[question.id] === optIdx &&
                            `border-primary border-2 hover:border-2 hover:border-primary`,
                        )}
                      >
                        <span
                          className={cn(
                            "bg-gray-100 text-muted-foreground w-7 h-7 rounded-xl shrink-0 flex items-center justify-center font-mono text-xs font-semibold transition-colors",
                            userAnswers[question.id] === optIdx &&
                              `bg-primary text-white`,
                          )}
                          // className={` ${letterStyle}`}
                        >
                          {letter}
                        </span>
                        <span className="text-sm font-medium pt-0.5 leading-relaxed">
                          {option}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Keyboard help hint */}
                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="hidden sm:inline">
                    Tip: Press{" "}
                    <kbd className="px-1.5 py-0.5 bg-gray-100 border border-border rounded font-mono text-[10px]">
                      1-4
                    </kbd>{" "}
                    or{" "}
                    <kbd className="px-1.5 py-0.5 bg-gray-100 border border-border rounded font-mono text-[10px]">
                      A-D
                    </kbd>{" "}
                    to select &middot;{" "}
                    <kbd className="px-1.5 py-0.5 bg-gray-100 border border-border rounded font-mono text-[10px]">
                      &rarr;
                    </kbd>{" "}
                    for next
                  </span>
                  <span className="font-mono">
                    {
                      Object.values(userAnswers).filter(
                        (ans) => ans !== undefined,
                      ).length
                    }{" "}
                    of {quiz.questions.length} answered
                  </span>
                </div>
              </div>
            );
          })()}

          {/* Bottom Actions Bar */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setQuestionIndex((prev) => Math.max(0, prev - 1))}
              disabled={questionIndex === 0}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                questionIndex === 0
                  ? "opacity-40 cursor-not-allowed bg-gray-100 text-muted-foreground border-border"
                  : "bg-white text-dark border-border hover:bg-gray-50 cursor-pointer shadow-sm"
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            {questionIndex < quiz.questions.length - 1 ? (
              <button
                onClick={() => setQuestionIndex((prev) => prev + 1)}
                className="btn-text bg-dark text-white px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-primary transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinishQuiz}
                className="btn-text bg-primary text-white px-7 py-2.5 rounded-full text-xs font-bold hover:bg-primary/90 transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-primary/20"
              >
                <Trophy className="w-4 h-4" />
                <span>Submit Quiz & View Results</span>
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <QuizResults
            quiz={quiz}
            userAnswers={userAnswers}
            timerSeconds={timeInseconds}
            onRetake={onRetake}
          />
        </>
      )}
      {/* Top Toolbar */}
    </div>
  );
};

export default QuizViewBox;
