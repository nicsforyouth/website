import { CalendarDays, Clock3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Article } from "@/types/article";

type Props = {
  article: Article;
};

export function ArticleMetadata({ article }: Props) {
  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">
          {article.author.name}
        </span>

        <span className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          {new Date(article.date).toLocaleDateString()}
        </span>

        <span className="flex items-center gap-2">
          <Clock3 className="h-4 w-4" />
          {article.readingTime}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
