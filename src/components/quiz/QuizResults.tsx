import { AnswerVerdict, Quiz, QuizQuestion } from "@/types/quiz";

interface Props {
  quiz: Quiz;
  userAnswers: UserAnswers;
  timerSeconds: number;
  onRetake: () => void;
  navigateHref?: string;
}

import { useState, useMemo } from "react";
import {
  Clock,
  RotateCcw,
  ArrowLeft,
  BookOpen,
  Target,
  BarChart3,
  PieChart as PieIcon,
  Zap,
  ChevronRight,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import {
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  Cell,
} from "recharts";
import { formatTime } from "@/lib/utils";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import QuizResultDetailedQueBox from "./QuizResultDetailedQueBox";
import { UserAnswers } from "./QuizViewBox";

export default function QuizResultsView({
  quiz,
  userAnswers,
  timerSeconds,
  onRetake,
  navigateHref,
}: Props) {
  const [activeTab, setActiveTab] = useState<"analytics" | "review">(
    "analytics",
  );

  const getVerdict = (
    question: QuizQuestion,
    userAnswers: UserAnswers,
  ): AnswerVerdict => {
    if (userAnswers[question.id] === undefined) {
      return "unanswered";
    }
    if (userAnswers[question.id] === question.correctIndex) {
      return "correct";
    }
    return "incorrect";
  };

  const scoreStats = useMemo(() => {
    function getScore() {
      let score = 0;
      quiz?.questions.map((question) => {
        if (userAnswers[question.id] === question.correctIndex) score++;
      });

      return score;
    }

    const getUnanswered = () =>
      Object.values(userAnswers).filter((ans) => ans === undefined).length;

    const total = quiz.questions.length;
    const correct = getScore();
    const unanswered = getUnanswered();
    const incorrect = total - correct - unanswered;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

    return {
      total,
      correct,
      incorrect,
      unanswered,
      percentage,
    };
  }, [quiz, userAnswers]);

  const questionsWithVerdict = quiz.questions.map((q) => {
    const verdict = getVerdict(q, userAnswers);
    return {
      ...q,
      verdict,
    };
  });
  const incorrectQuestions = questionsWithVerdict.filter(
    (q) => q.verdict === "incorrect",
  );
  const unansweredQuestions = questionsWithVerdict.filter(
    (q) => q.verdict === "unanswered",
  );

  const pacingStats = useMemo(() => {
    const totalQuestions = quiz.questions.length;
    const avgSecondsPerQuestion =
      totalQuestions > 0
        ? Math.round((timerSeconds / totalQuestions) * 10) / 10
        : 0;
    const allottedSeconds = (quiz.timeMinutes || 8) * 60;
    const timeUsedRatio = Math.min(
      100,
      Math.round((timerSeconds / allottedSeconds) * 100),
    );

    let speedAssessment = "Steady & Methodical";
    let speedIcon = Clock;
    if (avgSecondsPerQuestion <= 15) {
      speedAssessment = "Lightning Fast Pace";
      speedIcon = Zap;
    } else if (avgSecondsPerQuestion <= 35) {
      speedAssessment = "Optimal Exam Velocity";
      speedIcon = Target;
    } else {
      speedAssessment = "Deep Deliberation";
      speedIcon = Clock;
    }

    return {
      avgSecondsPerQuestion,
      allottedSeconds,
      timeUsedRatio,
      speedAssessment,
      speedIcon,
    };
  }, [quiz, timerSeconds]);

  const pieData = useMemo(() => {
    return [
      { name: "Correct", value: scoreStats.correct, color: "#10B981" },
      { name: "Incorrect", value: scoreStats.incorrect, color: "#F43F5E" },
      ...(scoreStats.unanswered > 0
        ? [
            {
              name: "Unanswered",
              value: scoreStats.unanswered,
              color: "#9CA3AF",
            },
          ]
        : []),
    ];
  }, [scoreStats]);

  const radialScoreData = useMemo(() => {
    return [
      {
        name: "Score",
        value: scoreStats.percentage,
        fill: "#10B981",
      },
    ];
  }, [scoreStats]);

  return (
    <div className="max-w-4xl space-y-8 animate-fadeIn">
      {/* Top Breadcrumb & Control Bar */}
      <div className="flex flex-col justify-between gap-4 pb-4 border-border">
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

        <Tabs
          defaultValue={activeTab}
          value={activeTab}
          onValueChange={setActiveTab}
          className={"space-y-2"}
        >
          <TabsList className={"w-full"}>
            <TabsTrigger value={"analytics"} className={"cursor-pointer"}>
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Statistics & Graphs</span>
            </TabsTrigger>
            <TabsTrigger value={"review"} className={"cursor-pointer"}>
              <BookOpen className="w-3.5 h-3.5" />
              <span>Detailed Review ({quiz.questions.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={"analytics"} className={"space-y-6"}>
            <div className="bg-white rounded-3xl border border-border p-6 shadow-sm relative overflow-hidden">
              <div className="pb-4">
                <h2 className="font-display text-xl font-bold text-dark">
                  Quiz Analysis
                </h2>
                <p className="text-muted-foreground text-xs mt-0.5">
                  How well you did in the test. We're proud of you regardless,
                  by the way {"</3"}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:flex lg:flex-col gap-8 items-center">
                {/* Radial Gauge / Left Summary */}
                <div className="lg:col-span-5 w-full flex flex-col items-center justify-center p-4 bg-[#FBFBFC] rounded-2xl border border-border/80">
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="75%"
                        outerRadius="100%"
                        barSize={14}
                        data={radialScoreData}
                        startAngle={90}
                        endAngle={-270}
                      >
                        <PolarAngleAxis
                          type="number"
                          domain={[0, 100]}
                          angleAxisId={0}
                          tick={false}
                        />
                        <RadialBar
                          background={{ fill: "#E5E7EB" }}
                          dataKey="value"
                          cornerRadius={10}
                        />
                      </RadialBarChart>
                    </ResponsiveContainer>

                    {/* Centered Score Inside Gauge */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="font-display text-4xl sm:text-5xl font-extrabold text-dark tracking-tight">
                        {scoreStats.percentage}%
                      </span>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-medium mt-0.5">
                        {scoreStats.correct} / {scoreStats.total} Correct
                      </span>
                    </div>
                  </div>
                </div>

                {/* Text Highlights & Quick Action */}
                <div className="lg:col-span-7 space-y-4 w-full">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                      CATEGORY:{" "}
                      <span className="text-primary">{quiz.category}</span>
                    </span>
                    <span className="text-muted-foreground text-xs">
                      &middot;
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">
                      {quiz.difficulty} Level
                    </span>
                  </div>

                  {/* KPI Metrics Row */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-gray-50 p-3 rounded-xl border border-border">
                      <div className="text-[11px] text-muted-foreground font-medium">
                        Time Taken
                      </div>
                      <div className="text-base font-bold font-mono text-dark mt-0.5">
                        {formatTime(timerSeconds)}s
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-border">
                      <div className="text-[11px] text-muted-foreground font-medium">
                        Avg Speed / Q
                      </div>
                      <div className="text-base font-bold font-mono text-primary mt-0.5">
                        {pacingStats.avgSecondsPerQuestion}s
                      </div>
                    </div>
                  </div>

                  {/* Primary Action Buttons */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                    <button
                      onClick={onRetake}
                      className="btn-text bg-primary text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-primary/90 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retake Quiz</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("review")}
                      className="btn-text bg-dark text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-gray-800 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>View Answers</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* SECTION 3: PACING & VELOCITY ANALYTICS + QUESTION DISTRIBUTION           */}
            {/* ========================================================================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Answer Distribution Pie */}
              <div className="bg-white rounded-3xl border border-border p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                    <PieIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-dark">
                      Answer Breakdown
                    </h3>
                    <p className="text-muted-foreground text-[10px]">
                      Correct vs Incorrect count
                    </p>
                  </div>
                </div>

                <div className="h-40 relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={42}
                        outerRadius={65}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`pie-cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-dark text-white p-2 rounded-lg text-xs font-mono">
                                {data.name}: {data.value} questions
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="font-mono text-lg font-bold text-dark">
                      {scoreStats.correct}/{scoreStats.total}
                    </span>
                    <span className="text-[9px] text-muted-foreground uppercase">
                      Hit Rate
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 text-xs font-mono pt-2 border-t border-border">
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    {scoreStats.correct} Correct
                  </span>
                  <span className="flex items-center gap-1.5 text-rose-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    {scoreStats.incorrect} Incorrect
                  </span>
                </div>
              </div>

              {/* Exam Velocity & Pacing */}
              <div className="bg-white rounded-3xl border border-border p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                      <pacingStats.speedIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-dark">
                        Pacing Velocity
                      </h3>
                      <p className="text-muted-foreground text-[10px]">
                        Time management evaluation
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 my-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Total Active Time:
                      </span>
                      <span className="font-mono font-bold text-dark">
                        {formatTime(timerSeconds)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Avg Time / Question:
                      </span>
                      <span className="font-mono font-bold text-primary">
                        {pacingStats.avgSecondsPerQuestion}s
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Allotted Time:
                      </span>
                      <span className="font-mono font-bold text-gray-700">
                        {quiz.timeMinutes} mins (
                        {formatTime(pacingStats.allottedSeconds)})
                      </span>
                    </div>

                    {/* Pacing progress bar */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono mb-1">
                        <span>Time Allocated Used</span>
                        <span>{pacingStats.timeUsedRatio}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-500"
                          style={{ width: `${pacingStats.timeUsedRatio}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-border text-xs text-muted-foreground flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="font-medium text-dark">
                    {pacingStats.speedAssessment}
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value={"review"} className={"space-y-8"}>
            <div className="space-y-6">
              {/* Review Header & Filters */}
              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm flex flex-col justify-between gap-4">
                <div>
                  <h2 className="font-display text-xl font-bold text-dark">
                    Question Analysis & Concept Walkthrough
                  </h2>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    Examine your answers with full reference solutions and
                    pedagogical explanations.
                  </p>
                </div>

                <div className="">
                  <Tabs defaultValue={"all"} className={"w-full"}>
                    <TabsList className={"w-full"}>
                      <TabsTrigger value={"all"} className={"cursor-pointer"}>
                        All ({quiz.questions.length})
                      </TabsTrigger>
                      <TabsTrigger
                        value={"incorrect"}
                        className={"cursor-pointer"}
                      >
                        Incorrect ({scoreStats.incorrect})
                      </TabsTrigger>
                      <TabsTrigger
                        value={"unanswered"}
                        className={"cursor-pointer"}
                      >
                        Unanswered ({scoreStats.unanswered})
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value={"all"}>
                      <div className="flex flex-col gap-4">
                        {questionsWithVerdict.map((q, idx) => {
                          const userAnswer = userAnswers[q.id];

                          return (
                            <QuizResultDetailedQueBox
                              key={idx}
                              q={q}
                              idx={idx}
                              userAnswer={userAnswer}
                            />
                          );
                        })}
                      </div>
                    </TabsContent>

                    <TabsContent value={"incorrect"}>
                      <div className="flex flex-col gap-4">
                        {incorrectQuestions.length === 0 ? (
                          <div className="w-full min-h-20">
                            <CheckCircle></CheckCircle>
                            <p>Great job! There are no incorrect answers :D</p>
                          </div>
                        ) : (
                          incorrectQuestions.map((q, idx) => {
                            const userAnswer = userAnswers[q.id];
                            return (
                              <QuizResultDetailedQueBox
                                q={q}
                                key={idx}
                                idx={idx}
                                userAnswer={userAnswer}
                              />
                            );
                          })
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value={"unanswered"}>
                      <div className="flex flex-col gap-4">
                        {unansweredQuestions.length === 0 ? (
                          <div className="w-full min-h-60 mt-4 text-muted-foreground space-y-6 bg-muted rounded-2xl flex flex-col items-center justify-center">
                            <CheckCircle className="h-16 w-16"></CheckCircle>
                            <p className="font-medium text-lg">
                              Great job! There are no unanswered questions :D
                            </p>
                          </div>
                        ) : (
                          unansweredQuestions.map((q, idx) => {
                            const userAnswer = userAnswers[q.id];
                            return (
                              <QuizResultDetailedQueBox
                                q={q}
                                key={idx}
                                idx={idx}
                                userAnswer={userAnswer}
                              />
                            );
                          })
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Sticky Action Footer */}
      <div className="pt-6 border-t border-border flex items-center justify-between">
        <Link
          href={"/quiz"}
          className="btn-text bg-white border border-border text-dark px-5 py-2 rounded-full text-xs font-semibold hover:bg-gray-50 transition-all cursor-pointer flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Quizzes</span>
        </Link>

        {navigateHref && (
          <Link
            href={`${navigateHref}`}
            className="btn-text bg-dark text-white px-5 py-2 rounded-full text-xs font-semibold hover:bg-primary transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            <span>Read Technical Guides</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
