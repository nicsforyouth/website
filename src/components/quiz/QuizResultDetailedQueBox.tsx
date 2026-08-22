import { capitalize } from "@/lib/utils";
import { AnswerVerdict, QuizQuestion } from "@/types/quiz";
import { CheckCircle2, XCircle, BookOpen } from "lucide-react";

const QuizResultDetailedQueBox = ({
  q,
  idx,
  userAnswer,
}: {
  q: QuizQuestion & {
    verdict: AnswerVerdict;
  };
  idx: number;
  userAnswer: number | undefined;
}) => {
  const { verdict } = q;
  const borderColor =
    verdict === "correct"
      ? "border-emerald-200"
      : verdict === "incorrect"
        ? "border-rose-200"
        : "border-yellow-200";

  const textColor =
    verdict === "correct"
      ? "bg-emerald-50 text-emerald-700"
      : verdict === "incorrect"
        ? "bg-rose-50 text-rose-700"
        : "bg-yellow-50 text-yellow-700";
  return (
    <div
      key={q.id || idx}
      className={`bg-white rounded-2xl border p-6 transition-all ${
        borderColor
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-muted-foreground">
            Question {idx + 1}
          </span>
        </div>

        <span
          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
            textColor
          }`}
        >
          {verdict === "correct" ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <XCircle className="w-3.5 h-3.5" />
            </>
          )}
          {capitalize(verdict)}
        </span>
      </div>

      <h3 className={"text-base font-bold text-dark mb-4 leading-snug"}>
        {q.question}
      </h3>

      {/* Code Snippet if present */}
      {q.codeSnippet && (
        <div className="mb-4 rounded-xl bg-[#0D1117] text-gray-200 p-3.5 font-mono text-xs border border-white/10 overflow-x-auto">
          <pre className="leading-relaxed">
            <code>{q.codeSnippet}</code>
          </pre>
        </div>
      )}

      {/* Options List */}
      <div className="space-y-2 mb-4">
        {q.options.map((opt, optIdx) => {
          const isUserChoice = userAnswer === optIdx;
          const isAnswerCorrect = q.correctIndex === optIdx;

          let bgStyle = "bg-gray-50 text-gray-700 border-border/60";
          if (isAnswerCorrect) {
            bgStyle =
              "bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold";
          } else if (isUserChoice && !isAnswerCorrect) {
            bgStyle =
              "bg-rose-50 border-rose-300 text-rose-900 line-through opacity-80";
          }

          return (
            <div
              key={optIdx}
              className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${bgStyle}`}
            >
              <span className="font-mono font-bold text-muted-foreground w-5">
                {String.fromCharCode(65 + optIdx)}.
              </span>
              <span className="flex-1">{opt}</span>
              {isAnswerCorrect && (
                <span className="text-[10px] uppercase font-mono text-emerald-700 font-bold">
                  Correct Answer
                </span>
              )}
              {isUserChoice && !isAnswerCorrect && (
                <span className="text-[10px] uppercase font-mono text-rose-700 font-bold">
                  Your Choice
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Explanation Box */}
      <div className="p-4 rounded-xl bg-gray-50 border border-border text-xs">
        <div className="font-bold text-dark mb-1 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-primary" />
          <span>Concept Explanation</span>
        </div>
        <p className="text-muted-foreground leading-relaxed">{q.explanation}</p>
      </div>
    </div>
  );
};

export default QuizResultDetailedQueBox;
