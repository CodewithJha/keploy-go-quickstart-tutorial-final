import type { ReactNode } from "react";

export function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="flex gap-4" aria-label={`Step ${number}: ${title}`}>
      <span
        aria-hidden="true"
        className="bg-accent text-on-accent mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold"
      >
        {number}
      </span>
      <div className="min-w-0 flex-1 space-y-3">
        <h3 className="mt-0 text-lg leading-8 font-semibold">{title}</h3>
        <div className="space-y-3 [&>*]:max-w-full">{children}</div>
      </div>
    </section>
  );
}
