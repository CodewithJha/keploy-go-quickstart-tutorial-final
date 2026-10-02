"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Says "Scroll" in the toolbar when the block's code is wider than its box. CSS keeps it
 * hidden on wider screens and reserves its space on narrow ones, so showing it never shifts layout.
 */
export function ScrollHint() {
  const ref = useRef<HTMLSpanElement>(null);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const pre = ref.current?.closest(".code-block")?.querySelector("pre");
    if (!pre) return;
    const check = () => setOverflows(pre.scrollWidth > pre.clientWidth + 1);
    const observer = new ResizeObserver(check);
    observer.observe(pre);
    document.fonts.ready.then(check);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="code-scroll-hint"
      data-visible={overflows || undefined}
    >
      Scroll →
    </span>
  );
}
