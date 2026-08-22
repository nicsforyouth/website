"use client";

import { cn } from "@/lib/utils";

type Props = {
  value: string;
  categories: readonly string[];
  onChange: (value: string) => void;
};

export function CategoryFilter({ categories, value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={cn(
            "rounded-2xl border border-border px-4 py-1.5 text-sm transition cursor-pointer",
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
