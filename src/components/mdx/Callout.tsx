"use client";

import type { ReactNode } from "react";
import {
  Lightbulb,
  Info,
  TriangleAlert,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

type CalloutType = "note" | "tip" | "warning" | "idea" | "success";

type CalloutProps = {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
};

const CALLOUTS = {
  note: {
    icon: Info,
    label: "Note",
    className:
      "border-blue-500/30 bg-blue-500/5 text-blue-950 dark:text-blue-100",
    iconClassName: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },

  tip: {
    icon: Lightbulb,
    label: "Tip",
    className:
      "border-amber-500/30 bg-amber-500/5 text-amber-950 dark:text-amber-100",
    iconClassName: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },

  warning: {
    icon: TriangleAlert,
    label: "Watch out",
    className: "border-red-500/30 bg-red-500/5 text-red-950 dark:text-red-100",
    iconClassName: "bg-red-500/10 text-red-600 dark:text-red-400",
  },

  idea: {
    icon: Sparkles,
    label: "Think about it",
    className:
      "border-purple-500/30 bg-purple-500/5 text-purple-950 dark:text-purple-100",
    iconClassName: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },

  success: {
    icon: CheckCircle2,
    label: "Nice!",
    className:
      "border-emerald-500/30 bg-emerald-500/5 text-emerald-950 dark:text-emerald-100",
    iconClassName: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
} satisfies Record<
  CalloutType,
  {
    icon: typeof Info;
    label: string;
    className: string;
    iconClassName: string;
  }
>;

export function Callout({ type = "note", title, children }: CalloutProps) {
  const config = CALLOUTS[type];
  const Icon = config.icon;

  return (
    <aside
      className={["my-6 rounded-xl border p-4", config.className].join(" ")}
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <div
          className={[
            "flex size-8 shrink-0 items-center justify-center rounded-lg",
            config.iconClassName,
          ].join(" ")}
        >
          <Icon className="size-4" />
        </div>

        <p className="font-semibold leading-none">{title ?? config.label}</p>
      </div>

      {/* Content */}
      <div className="mt-3 text-sm leading-6 opacity-90">{children}</div>
    </aside>
  );
}
