"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortItem = {
  label: string;
  value: string;
};

type Props = {
  value: string;
  onChange: (value: string) => void;
  items: SortItem[];
};

export function SortDropdown({ value, onChange, items }: Props) {
  return (
    <Select
      items={items}
      value={value}
      onValueChange={(v) => onChange(v || "")}
    >
      <SelectTrigger className="w-full max-w-55">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort Options</SelectLabel>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
