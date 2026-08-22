"use client";

import { useEffect, useMemo, useState } from "react";

import { CircleQuestionMark, SlidersHorizontal } from "lucide-react";
import { useQuizFilters } from "@/hooks/useQuizFilters";
import { ORDERED_DIFFICULTY, Quiz, QUIZ_CATEGORIES } from "@/types/quiz";
import { SearchBar } from "../shared/SearchBar";
import QuizCard from "./QuizCard";
import { SortDropdown, SortItem } from "../shared/SortDropdown";
import { CategoryFilter } from "../shared/CategoryFilter";
import { capitalize } from "@/lib/utils";
import { search } from "@/lib/search-helpers";

type Props = {
  quizzes: Quiz[];
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
    label: "Time",
    value: "time",
  },
  {
    label: "Difficulty: Beginner First",
    value: "difficulty-e_t_h",
  },
  {
    label: "Difficulty: Advanced First",
    value: "difficulty-h_t_e",
  },
] as const satisfies SortItem[];

export function QuizExplorer({ quizzes }: Props) {
  const {
    search: searchStr,
    category,
    sort,
    difficulty,
    setCategory,
    setSearch,
    setSort,
    setDifficulty,
  } = useQuizFilters();

  const [searchInput, setSearchInput] = useState(searchStr);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput);
    }, 250);

    return () => clearTimeout(timeout);
  }, [searchInput, setSearch]);

  const filtered = useMemo(() => {
    let result = [...quizzes];

    if (category !== "All") {
      result = result.filter((quiz) => quiz.category === category);
    }

    if (difficulty !== "All") {
      result = result.filter((quiz) => quiz.difficulty === difficulty);
    }

    if (searchStr.trim()) {
      const searchResults = search(result, searchStr, [
        {
          getValue: (quiz) => quiz.title,
          weight: 5,
        },
        {
          getValue: (quiz) => quiz.tags,
          weight: 4,
        },
        {
          getValue: (quiz) => quiz.category,
          weight: 4,
        },
        {
          getValue: (quiz) => quiz.description,
          weight: 3,
        },
        {
          getValue: (quiz) => quiz.difficulty,
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

      case "time":
        result.sort((a, b) => a.timeMinutes - b.timeMinutes);
        break;

      case "difficulty-e_t_h":
        result.sort(
          (a, b) =>
            ORDERED_DIFFICULTY.indexOf(a.difficulty) -
            ORDERED_DIFFICULTY.indexOf(b.difficulty),
        );
        break;

      case "difficulty-h_t_e":
        result.sort(
          (a, b) =>
            ORDERED_DIFFICULTY.indexOf(b.difficulty) -
            ORDERED_DIFFICULTY.indexOf(a.difficulty),
        );

      case "relevance":
      default:
        break;
    }

    return result;
  }, [quizzes, category, searchStr, sort, difficulty]);

  return (
    <section className="space-y-8">
      <div>
        {/* Search & Categories Bar */}
        <div className="bg-white border border-border p-4 rounded-3xl shadow-xs">
          {/* Search field */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between relative w-full">
            <SearchBar
              placeholder="Search quizzes"
              value={searchInput}
              onChange={setSearchInput}
            />

            <SortDropdown items={sortItems} value={sort} onChange={setSort} />
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"></div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground pt-2">
          <span className="flex items-center gap-1 font-medium">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Difficulty:
          </span>
          {["All", ...ORDERED_DIFFICULTY].map((diff) => (
            <button
              key={diff}
              onClick={() => setDifficulty(diff)}
              className={`px-2.5 py-1 rounded-md cursor-pointer ${
                difficulty === diff
                  ? "bg-primary/10 text-primary font-semibold"
                  : "hover:text-dark hover:bg-gray-100 px-3"
              }`}
            >
              {capitalize(diff)}
            </button>
          ))}
        </div>
      </div>

      <CategoryFilter
        categories={QUIZ_CATEGORIES}
        value={category}
        onChange={setCategory}
      />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"></div>
      {filtered.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2">
          {filtered.map((quiz) => (
            <QuizCard key={quiz.slug} quiz={quiz} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-border rounded-3xl p-16 w-full text-center space-y-4">
          <div className="w-16 h-16 bg-bg-alt rounded-full flex items-center justify-center mx-auto text-muted-foreground">
            <CircleQuestionMark size={28} />
          </div>
          <h3 className="text-lg font-bold text-dark">No Quizzes Found</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            It seems like your knowledge if beyond our comprehension. We
            don&apos;t have anything for you, sadly.
          </p>
        </div>
      )}
    </section>
  );
}
