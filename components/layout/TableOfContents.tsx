"use client";

import { useEffect, useState } from "react";
import { toc } from "@/config/toc";

const HEADER_OFFSET_PX = 96;

export function TableOfContents() {
  const [activeId, setActiveId] = useState<string>(toc[0].id);

  useEffect(() => {
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const first = toc.find((item) => visible.has(item.id));
        if (first) setActiveId(first.id);
      },
      { rootMargin: `-${HEADER_OFFSET_PX}px 0px -65% 0px` },
    );
    for (const item of toc) {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Table of contents">
      <p className="mb-3 text-sm font-semibold">On this page</p>
      <ul className="border-line space-y-0.5 border-l">
        {toc.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? "location" : undefined}
                className={`-ml-px block border-l py-1 pl-4 text-sm leading-snug ${
                  active
                    ? "border-accent-text text-accent-text font-medium"
                    : "text-muted hover:text-fg border-transparent"
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
