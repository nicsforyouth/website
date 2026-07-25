"use client";

import { useEffect, useRef } from "react";

export function ReadingProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const bar = progressRef.current;
      const article = document.getElementById("article-content");

      if (!bar || !article) return;

      const rect = article.getBoundingClientRect();
      const articleTop = window.scrollY + rect.top;
      const articleHeight = article.offsetHeight;
      const viewportMiddle = window.scrollY + window.innerHeight * 0.25;

      const progress = (viewportMiddle - articleTop) / articleHeight;
      const clamped = Math.min(Math.max(progress, 0), 1);

      bar.style.transform = `scaleX(${clamped})`;
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(update);
    };

    update();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1.25 bg-transparent">
      <div
        ref={progressRef}
        className="h-full origin-left bg-primary"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
