import type { ReactNode } from "react";

/** On phones the body spans the full width; from `sm` it sits in line with the title. */
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
    <section
      className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-3 not-first:mt-8 sm:gap-x-4"
      aria-label={`Step ${number}: ${title}`}
    >
      <span
        aria-hidden="true"
        className="bg-accent text-on-accent flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold"
      >
        {number}
      </span>
      <h3 className="mt-0 self-center text-lg leading-snug font-semibold">{title}</h3>
      <div className="col-span-2 mt-0 min-w-0 space-y-(--flow-space) sm:col-span-1 sm:col-start-2">
        {children}
      </div>
    </section>
  );
}
