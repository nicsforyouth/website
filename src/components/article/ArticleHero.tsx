import { Badge } from "@/components/ui/badge";

import { ArticleCover } from "./ArticleCover";
import { ArticleMetadata } from "./ArticleMetadata";

import { Article } from "@/types/article";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = {
  article: Article;
};

export function ArticleHero({ article }: Props) {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <Link
          prefetch
          href="/articles"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to Articles
        </Link>
      </div>
      <div className="mx-auto mb-16 max-w-3xl">
        <Badge className="mb-6">{article.category}</Badge>

        <h1 className="text-5xl font-bold tracking-tight">{article.title}</h1>

        <p className="mt-6 text-xl text-muted-foreground">
          {article.description}
        </p>

        <ArticleMetadata article={article} />
      </div>

      {article.cover && (
        <ArticleCover src={article.cover} alt={article.title} />
      )}
    </>
  );
}
