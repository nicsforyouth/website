import { Quiz } from "@/types/quiz";

import fs from "node:fs/promises";
import path from "node:path";

import fg from "fast-glob";
import matter from "gray-matter";

const QUIZZES_PATH = path.join(process.cwd(), "content", "quizzes");

export async function getAllQuizzes(): Promise<Quiz[]> {
  const files = await fg("**/*.json", {
    cwd: QUIZZES_PATH,
  });

  const quizzes = await Promise.all(
    files.map(async (file) => {
      const source = await fs.readFile(path.join(QUIZZES_PATH, file), "utf8");
      const { data, content: _ } = matter(source);
      return {
        ...(data as Quiz),
        ...(JSON.parse(_) as Quiz),
      };
    }),
  );

  return quizzes.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getQuizBySlug(slug: string): Promise<Quiz | null> {
  const all = await getAllQuizzes();
  return all.find((q) => q.slug === slug || q.slug === slug) || null;
}
