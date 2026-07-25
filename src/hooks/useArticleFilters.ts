"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useArticleFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  function setParam(key: string, value?: string) {
    const next = new URLSearchParams(params.toString());

    if (!value || value === "All" || value === "") {
      next.delete(key);
    } else {
      next.set(key, value);
    }

    const nextQuery = next.toString();
    const currentQuery = params.toString();

    if (nextQuery === currentQuery) return;

    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
      scroll: false,
    });
  }

  return {
    search: params.get("q") ?? "",
    category: params.get("category") ?? "All",
    sort: params.get("sort") ?? "newest",

    setSearch: (value: string) => setParam("q", value),
    setCategory: (value: string) => setParam("category", value),
    setSort: (value: string) => setParam("sort", value),
  };
}
