import Link from "next/link";
import { Clock3 } from "lucide-react";

import { Article } from "@/types/article";
import { ShareButton } from "./ShareButton";

type Props = {
  article: Article;
};

export function ArticleCard({ article }: Props) {
  return (
    <article className="overflow-hidden rounded-2xl bg-background border transition hover:border-primary">
      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="rounded-full bg-primary/10 text-primary font-bold px-2 py-1 text-[11px]">
              {article.category.toUpperCase()}
            </span>

            <Link href={`/articles/${article.slug}`}>
              <h2 className="mt-3 text-2xl font-bold transition hover:text-primary">
                {article.title}
              </h2>
            </Link>
          </div>

          <ShareButton slug={article.slug} />
        </div>

        <p className="line-clamp-3 text-sm text-muted-foreground">
          {article.description}
        </p>

        <div>
          <div className="flex items-center justify-between border-t border-border/80 pt-4 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-xs uppercase">
                {article.author.name[0]}
              </div>
              <div>
                <div className="text-xs font-semibold text-dark">
                  {article.author.name}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {new Date(article.date).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    weekday: "short",
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <span className="flex items-center text-muted-foreground text-xs justify-center gap-2">
                <Clock3 className="h-3 w-3" />
                {article.readingTime}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
