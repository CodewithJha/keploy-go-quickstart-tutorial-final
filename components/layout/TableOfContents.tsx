"use client";

import { useEffect, useRef, useState } from "react";
import { toc } from "@/config/toc";

/** A heading counts as current once it passes this line below the sticky header. */
const ACTIVE_LINE_PX = 120;
const CLICK_LOCK_FALLBACK_MS = 1200;

function sectionAtScrollPosition(): string {
  const root = document.documentElement;
  if (window.scrollY + window.innerHeight >= root.scrollHeight - 2) {
    return toc[toc.length - 1].id;
  }
  let current = toc[0].id;
  for (const item of toc) {
    const element = document.getElementById(item.id);
    if (element && element.getBoundingClientRect().top <= ACTIVE_LINE_PX) current = item.id;
  }
  return current;
}

export function TableOfContents() {
  const [activeId, setActiveId] = useState<string>(toc[0].id);
  const clickedId = useRef<string | null>(null);
  const unlockTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    let frame = 0;
    function update() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!clickedId.current) setActiveId(sectionAtScrollPosition());
      });
    }
    function unlock() {
      clickedId.current = null;
      clearTimeout(unlockTimer.current);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("scrollend", unlock);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(unlockTimer.current);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("scrollend", unlock);
    };
  }, []);

  function select(id: string) {
    clickedId.current = id;
    setActiveId(id);
    clearTimeout(unlockTimer.current);
    unlockTimer.current = setTimeout(() => {
      clickedId.current = null;
    }, CLICK_LOCK_FALLBACK_MS);
  }

  return (
    <nav aria-label="Table of contents">
      <p className="mb-3 text-sm font-semibold">On this page</p>
      <ul>
        {toc.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => select(item.id)}
                aria-current={active ? "location" : undefined}
                className={`block border-l py-1.5 pl-4 text-sm leading-snug ${
                  active
                    ? "border-accent-text text-accent-text font-medium"
                    : "text-muted hover:text-fg border-line"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
