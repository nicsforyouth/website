"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { Heading } from "@/lib/remark-headings";
import { cn } from "@/lib/utils";

type Props = {
  headings: Heading[];
};

export function ArticleTOC({ headings }: Props) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const elements = headings
      .map((h) => document.getElementById(h.slug))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "0px 0px -70% 0px",
        threshold: 0,
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav className="sticky top-28">
      <p className="mb-4 text-sm font-bold uppercase tracking-wide text-muted-foreground">
        Contents
      </p>

      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.slug} className={cn(heading.depth === 3 && "ml-4")}>
            <Link
              href={`#${heading.slug}`}
              className={cn(
                "block border-l-2 border-transparent pl-3 text-sm transition-colors text-muted-foreground hover:text-primary",
                active === heading.slug &&
                  "border-primary font-medium text-primary",
              )}
            >
              {heading.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
