import type { ReactNode } from "react";
import { FlagIcon } from "@/components/icons";

export function Checkpoint({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside
      aria-label={`Checkpoint: ${title}`}
      className="border-tip/40 bg-tip/10 flex gap-3 rounded-xl border p-4 text-[0.97rem] leading-relaxed"
    >
      <FlagIcon className="text-tip mt-0.5 shrink-0" />
      <div className="min-w-0">
        <p className="text-fg font-semibold">Checkpoint: {title}</p>
        <div className="mt-1">{children}</div>
      </div>
    </aside>
  );
}
