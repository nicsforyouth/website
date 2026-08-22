"use client";

import { Search } from "lucide-react";

type Props = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange, placeholder }: Props) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        placeholder={placeholder}
        className="w-full bg-bg-alt border border-border rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:border-accent text-dark"
      />
    </div>
  );
}
