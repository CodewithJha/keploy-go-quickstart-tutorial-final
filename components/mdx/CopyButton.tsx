"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/icons";

const RESET_DELAY_MS = 2000;

type Status = "idle" | "copied" | "failed";

const visibleText: Record<Status, string> = { idle: "Copy", copied: "Copied", failed: "Failed" };
const announcement: Record<Status, string> = {
  idle: "",
  copied: "Copied to clipboard",
  failed: "Copy failed. Select the text and copy it manually.",
};

/** `what` completes the accessible name, for example "Copy command". */
export function CopyButton({ text, what = "code" }: { text: string; what?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), RESET_DELAY_MS);
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="text-muted hover:text-fg hover:bg-bg inline-flex h-11 min-w-11 shrink-0 items-center justify-center gap-1.5 rounded-md px-3 text-xs font-medium sm:h-10"
      >
        {status === "copied" ? (
          <CheckIcon width={15} height={15} className="text-tip" />
        ) : (
          <CopyIcon width={15} height={15} />
        )}
        <span>
          {visibleText[status]}
          {status === "idle" ? <span className="sr-only"> {what}</span> : null}
        </span>
      </button>
      <span role="status" className="sr-only">
        {announcement[status]}
      </span>
    </>
  );
}
