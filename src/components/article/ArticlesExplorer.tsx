"use client";

import { useEffect, useMemo, useState } from "react";

import { Article } from "@/types/article";

import { ArticleCard } from "./ArticleCard";
import { CategoryFilter } from "./CategoryFilter";
import { SearchBar } from "../shared/SearchBar";
import { SortDropdown, SortOption } from "./SortDropdown";
import { BookOpen } from "lucide-react";
import { useArticleFilters } from "@/hooks/useArticleFilters";

type Props = {
  articles: Article[];
};

export function ArticlesExplorer({ articles }: Props) {
  const { search, category, sort, setCategory, setSearch, setSort } =
    useArticleFilters();

  const [searchInput, setSearchInput] = useState(search);

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

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((article) => {
        return (
          article.title.toLowerCase().includes(query) ||
          article.description.toLowerCase().includes(query) ||
          article.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      });
    }

    switch (sort) {
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

      default:
        result.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
    }

    return result;
  }, [articles, category, search, sort]);

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

          <SortDropdown value={sort as SortOption} onChange={setSort} />
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"></div>

      <CategoryFilter value={category} onChange={setCategory} />

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
