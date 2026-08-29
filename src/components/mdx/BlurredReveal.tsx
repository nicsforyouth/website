"use client";

import { useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function BlurredReveal({ children }: Props) {
  const [revealed, setRevealed] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setRevealed(true)}
      className="w-full cursor-pointer rounded-lg text-left transition-colors"
    >
      <div
        className={[
          "transition-all duration-300",
          revealed
            ? "text-foreground"
            : "select-none blur-[5px] text-foreground/80",
        ].join(" ")}
      >
        {children}
      </div>
    </button>
  );
}
