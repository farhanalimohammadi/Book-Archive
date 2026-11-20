
"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrameId = 0;

    function updateProgress() {
      const documentHeight =
        document.documentElement.scrollHeight;

      const viewportHeight = window.innerHeight;

      const scrollableHeight =
        documentHeight - viewportHeight;

      const percentage =
        scrollableHeight <= 0
          ? 100
          : (window.scrollY / scrollableHeight) * 100;

      setProgress(
        Math.min(100, Math.max(0, Math.round(percentage))),
      );
    }

    function scheduleUpdate() {
      cancelAnimationFrame(animationFrameId);

      animationFrameId = requestAnimationFrame(updateProgress);
    }

    updateProgress();

    window.addEventListener("scroll", scheduleUpdate, {
      passive: true,
    });

    window.addEventListener("resize", scheduleUpdate);

    const resizeObserver = new ResizeObserver(scheduleUpdate);

    resizeObserver.observe(document.documentElement);

    return () => {
      cancelAnimationFrame(animationFrameId);

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="میزان پیشرفت مطالعه"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      className="fixed inset-x-0 top-0 z-[60] h-1 bg-border/50"
    >
      <div
        className="h-full bg-primary transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
