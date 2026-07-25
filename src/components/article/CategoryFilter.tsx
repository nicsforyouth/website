"use client";

import { cn } from "@/lib/utils";
import { ARTICLE_CATEGORIES } from "@/types/article";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function CategoryFilter({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {ARTICLE_CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={cn(
            "rounded-full border px-4 py-2 text-sm transition",
            value === category &&
              "border-primary bg-primary text-primary-foreground",
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
