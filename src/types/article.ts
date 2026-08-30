import { Heading } from "@/lib/remark-headings";
import { ReactNode } from "react";

export const ARTICLE_CATEGORIES = [
  "All",
  "AI",
  "DevOps",
  "Programming",
  "Workshop",
  "Web Development",
  "QoL",
  "Opinion",
  "Announcement",
  "Writing",
  "Club Related",
] as const;

type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];

type Author = {
  name: string;
  avatar: string;
};

export interface ArticleFrontmatter {
  title: string;
  description: string;
  date: string;
  author: Author;
  cover?: string;
  category: ArticleCategory;
  summary?: string;
  tags: string[];
  published: boolean;
  isFeatured?: boolean;
}

export interface ArticleMeta extends ArticleFrontmatter {
  slug: string;
  readingTime: string;
}

export interface Article extends ArticleMeta {
  content: ReactNode;
  headings: Heading[];
}
