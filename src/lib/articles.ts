import fs from "node:fs/promises";
import path from "node:path";

import fg from "fast-glob";
import matter from "gray-matter";
import readingTime from "reading-time";

import { Article } from "@/types/article";
import { parseMDX } from "./mdx";
import { extractHeadings } from "./headings";

const ARTICLES_PATH = path.join(process.cwd(), "content", "articles");

export async function getAllArticles(): Promise<Article[]> {
  const files = await fg("**/*.mdx", {
    cwd: ARTICLES_PATH,
  });

  const articles = await Promise.all(
    files.map(async (file) => {
      const source = await fs.readFile(path.join(ARTICLES_PATH, file), "utf8");
      const { data, content } = matter(source);
      return {
        ...(data as Omit<Article, "slug" | "readingTime">),
        slug: file.replace(/\.mdx$/, ""),
        readingTime: readingTime(content).text,
      };
    }),
  );

  return articles
    .filter((article) => article.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getArticle(slug: string) {
  const file = path.join(ARTICLES_PATH, `${slug}.mdx`);
  const source = await fs.readFile(file, "utf8");
  const { data, content: rawContent } = matter(source);
  const headings = extractHeadings(rawContent);
  const { content } = await parseMDX(rawContent);
  return {
    ...(data as Omit<Article, "slug" | "readingTime" | "content" | "headings">),
    slug,
    readingTime: readingTime(rawContent).text,
    content,
    headings,
  };
}

export async function getAllSlugs() {
  const files = await fg("**/*.mdx", {
    cwd: ARTICLES_PATH,
  });

  return files.map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }));
}
