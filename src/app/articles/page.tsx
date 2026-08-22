import { getAllArticles } from "@/lib/articles";
import { ArticlesExplorer } from "@/components/article/ArticlesExplorer";
import { FeaturedArticle } from "@/components/article/FeaturedArticle";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Articles",
  description: "Articles published by NICS.",
};

function ExplorerSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-16 rounded-3xl" />

      <div className="grid gap-8 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-72 rounded-3xl" />
        ))}
      </div>
    </div>
  );
}

export default async function ArticlesPage() {
  const articles = await getAllArticles();
  const featured = articles.find((a) => a.isFeatured) ?? articles[0];

  return (
    <>
      <main>
        <div className="min-h-screen bg-bg-alt text-dark font-body relative overflow-hidden pt-12 pb-20">
          <div className="absolute right-0 top-0 w-125 h-125 rounded-full bg-primary-light/40 blur-[150px] pointer-events-none" />
          <div className="absolute -left-25 bottom-0 w-100 h-100 rounded-full bg-primary-light/30 blur-[120px] pointer-events-none" />

          <div className="px-6 relative z-10 py-0 mx-auto max-w-6xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/"
                id="articles-back-home-btn"
                className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
              >
                <ArrowLeft
                  size={16}
                  className="transition-transform group-hover:-translate-x-1"
                />
                Back to homepage
              </Link>
            </div>
            <div className="py-16">
              <div>
                <div>
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full uppercase tracking-wider">
                        NICS Knowledge Center
                      </div>
                      <h1 className="font-display text-5xl md:text-6xl text-dark tracking-tight leading-tight">
                        NICS Articles
                      </h1>
                      <p className="text-body text-muted-foreground max-w-2xl">
                        Deep dives, walkthroughs, roadmap blueprints, and guides
                        written by high schoolers and peer leaders at NICS.
                      </p>
                    </div>

                    {featured && <FeaturedArticle article={featured} />}

                    <Suspense fallback={<ExplorerSkeleton />}>
                      <ArticlesExplorer articles={articles} />
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
