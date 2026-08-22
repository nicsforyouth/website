import { z } from "zod";

/*  INFO: ORDER MATTERS! used for sorting by difficulty */
export const ORDERED_DIFFICULTY = [
  "beginner",
  "intermediate",
  "advanced",
] as const;

export const QUIZ_CATEGORIES = [
  "All",
  "Coding",
  "AI/ML",
  "Systems",
  "Algorithms",
  "CyberSecurity",
  "General",
] as const;

export type QuizCategory = (typeof QUIZ_CATEGORIES)[number];
export type QuizDifficulty = (typeof ORDERED_DIFFICULTY)[number];

const QuizQuestionSchema = z.object({
  id: z.string().nonempty(),
  question: z.string().nonempty(),
  codeSnippet: z.string().optional(),
  options: z.array(z.string()),
  correctIndex: z.number().int().nonnegative(),
  explanation: z.string(),
});
export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;

export const QuizSchema = z.object({
  slug: z.string().nonempty(),
  title: z.string().nonempty(),
  category: z.literal(QUIZ_CATEGORIES),
  date: z.string(),
  difficulty: z.literal(ORDERED_DIFFICULTY),
  timeMinutes: z.number(),
  description: z.string(),
  tags: z.array(z.string()),
  questions: z.array(QuizQuestionSchema),
});

export type Quiz = z.infer<typeof QuizSchema>;

export type AnswerVerdict = "correct" | "incorrect" | "unanswered";
export type UserAnswers = Record<string, number | undefined>;
