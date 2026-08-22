import { getAllSlugs, getArticle } from "@/lib/articles";
import type { Metadata } from "next";
import { ArticleContent } from "@/components/article/ArticleContent";
import { ArticleHero } from "@/components/article/ArticleHero";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { ReadingProgress } from "@/components/article/ReadingProgress";
import { ArticleTOC } from "@/components/article/ArticleTOC";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export async function generateStaticParams() {
  return getAllSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: article.cover ? [article.cover] : undefined,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  return (
    <>
      <ReadingProgress />
      <ArticleLayout>
        <ArticleHero article={article} />

        <div className="mx-auto grid grid-cols-1 w-full max-w-360 lg:grid-cols-[1fr_min(720px,100%)_1fr] gap-8 px-6">
          <aside className="hidden lg:block">
            <ArticleTOC headings={article.headings} />
          </aside>

          <main className="min-w-0">
            <ArticleContent>{article.content}</ArticleContent>
          </main>

          <aside className="hidden lg:block"></aside>
        </div>
      </ArticleLayout>
      <div className="border-t border-gray-200"></div>

      <div className="flex items-center justify-center my-12">
        <Link
          prefetch
          href="/articles"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
        >
          View all Articles
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </>
  );
}
