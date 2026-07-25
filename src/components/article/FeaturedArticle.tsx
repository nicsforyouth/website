import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock3, ArrowRight } from "lucide-react";

import { Article } from "@/types/article";
import { ShareButton } from "./ShareButton";
import { buttonVariants } from "../ui/button";

type Props = {
  article: Article;
};

export function FeaturedArticle({ article }: Props) {
  return (
    <article className="relative overflow-hidden bg-background rounded-3xl border">
      <div className="grid lg:grid-cols-2">
        {article.cover && (
          <div className="relative">
            <Image
              src={article.cover}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="flex flex-col p-8">
          <div className="space-y-5">
            <span className="inline-flex rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              Featured
            </span>

            <h2 className="text-4xl font-bold">{article.title}</h2>

            <p className="text-muted-foreground">{article.description}</p>

            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-3 py-1 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                {new Date(article.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>

              <span className="flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                {article.readingTime}
              </span>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <Link
              href={`/articles/${article.slug}`}
              className={buttonVariants({
                variant: "default",
                size: "lg",
              })}
            >
              Read article
              <ArrowRight className="h-4 w-4" />
            </Link>

            <ShareButton slug={article.slug} />
          </div>
        </div>
      </div>
    </article>
  );
}
