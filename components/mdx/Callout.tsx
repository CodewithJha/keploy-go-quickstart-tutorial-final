import type { ReactNode } from "react";
import { InfoIcon, TipIcon, WarningIcon } from "@/components/icons";

const variants = {
  info: { tone: "[--tone:var(--info)]", Icon: InfoIcon, label: "Note" },
  tip: { tone: "[--tone:var(--tip)]", Icon: TipIcon, label: "Tip" },
  warning: { tone: "[--tone:var(--warning)]", Icon: WarningIcon, label: "Warning" },
} as const;

export type CalloutType = keyof typeof variants;

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: CalloutType;
  title: string;
  children: ReactNode;
}) {
  const { tone, Icon, label } = variants[type];
  return (
    <aside
      aria-label={`${label}: ${title}`}
      className={`${tone} flex gap-3 rounded-xl border border-[color-mix(in_oklab,var(--tone)_35%,var(--line))] bg-[color-mix(in_oklab,var(--tone)_7%,var(--bg))] p-4 text-[0.97rem] leading-relaxed`}
    >
      <Icon className="mt-0.5 shrink-0 text-(--tone)" />
      <div className="min-w-0">
        <p className="text-fg font-semibold">{title}</p>
        <div className="mt-1">{children}</div>
      </div>
    </aside>
  );
}
