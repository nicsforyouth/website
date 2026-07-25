"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption = "newest" | "oldest" | "title" | "reading";

type Props = {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

export function SortDropdown({ value, onChange }: Props) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as SortOption)}>
      <SelectTrigger className="w-45">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="newest">Newest</SelectItem>
        <SelectItem value="oldest">Oldest</SelectItem>
        <SelectItem value="title">Title</SelectItem>
        <SelectItem value="reading">Reading Time</SelectItem>
      </SelectContent>
    </Select>
  );
}
