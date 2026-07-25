import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function ArticleContent({ children }: Props) {
  return (
    <article
      id="article-content"
      className="
        prose
        prose-neutral
        dark:prose-invert
        max-w-none w-full
        prose-headings:scroll-mt-28
        prose-img:rounded-xl
        prose-pre:rounded-xl
        prose-table:block
        prose-table:overflow-x-auto
      "
    >
      {children}
    </article>
  );
}
