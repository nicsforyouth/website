"use client";

import { useEffect, useMemo, useState } from "react";

import { Article, ARTICLE_CATEGORIES } from "@/types/article";

import { ArticleCard } from "./ArticleCard";
import { CategoryFilter } from "../shared/CategoryFilter";
import { SearchBar } from "../shared/SearchBar";
import { BookOpen } from "lucide-react";
import { useArticleFilters } from "@/hooks/useArticleFilters";
import { SortDropdown, SortItem } from "../shared/SortDropdown";
import { search } from "@/lib/search-helpers";

type Props = {
  articles: Article[];
};

const sortItems = [
  { label: "Relevance", value: "relevance" },
  {
    label: "Newest",
    value: "newest",
  },
  {
    label: "Oldest",
    value: "oldest",
  },
  {
    label: "Title",
    value: "title",
  },
  {
    label: "Reading Time",
    value: "reading",
  },
] as const satisfies SortItem[];

export function ArticlesExplorer({ articles }: Props) {
  const {
    search: searchStr,
    category,
    sort,
    setCategory,
    setSearch,
    setSort,
  } = useArticleFilters();

  const [searchInput, setSearchInput] = useState(searchStr);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput);
    }, 250);

    return () => clearTimeout(timeout);
  }, [searchInput, setSearch]);

  const filtered = useMemo(() => {
    let result = [...articles];

    if (category !== "All") {
      result = result.filter((article) => article.category === category);
    }

    if (searchStr.trim()) {
      const searchResults = search(result, searchStr, [
        {
          getValue: (article) => article.title,
          weight: 5,
        },
        {
          getValue: (article) => article.tags,
          weight: 4,
        },
        {
          getValue: (article) => article.category,
          weight: 4,
        },
        {
          getValue: (article) => article.description,
          weight: 3,
        },
        {
          getValue: (article) => article.summary,
          weight: 3,
        },
        {
          getValue: (article) => article.author.name,
          weight: 1,
        },
      ]);
      result = searchResults.map((r) => r.item);
    }

    switch (sort) {
      case "newest":
        result.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        break;
      case "oldest":
        result.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
        break;

      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case "reading":
        result.sort(
          (a, b) =>
            Number.parseInt(a.readingTime) - Number.parseInt(b.readingTime),
        );
        break;

      case "relevance":
      default:
        break;
    }

    return result;
  }, [articles, category, searchStr, sort]);

  return (
    <section className="space-y-8">
      {/* Search & Categories Bar */}
      <div className="bg-white border border-border p-4 rounded-3xl gap-4 shadow-xs">
        {/* Search field */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between relative w-full">
          <SearchBar
            placeholder="Search titles, authors..."
            value={searchInput}
            onChange={setSearchInput}
          />

          <SortDropdown items={sortItems} value={sort} onChange={setSort} />
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"></div>

      <CategoryFilter
        categories={ARTICLE_CATEGORIES}
        value={category}
        onChange={setCategory}
      />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"></div>
      {filtered.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2">
          {filtered.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-border rounded-3xl p-16 w-full text-center space-y-4">
          <div className="w-16 h-16 bg-bg-alt rounded-full flex items-center justify-center mx-auto text-muted-foreground">
            <BookOpen size={28} />
          </div>
          <h3 className="text-lg font-bold text-dark">No Articles Found</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Try searching for something else or filter by a different domain.
            Or, write and publish your own article!
          </p>
        </div>
      )}
    </section>
  );
}
