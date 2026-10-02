import type { ReactNode } from "react";

type ProblemProps = {
  title: string;
  why: ReactNode;
  identify: ReactNode;
  fix: ReactNode;
  verify: ReactNode;
};

export function Problem({ title, why, identify, fix, verify }: ProblemProps) {
  const rows = [
    ["Why it happens", why],
    ["How to identify it", identify],
    ["Fix", fix],
    ["Verify", verify],
  ] as const;

  return (
    <section className="border-line rounded-xl border p-4 sm:p-5" aria-label={title}>
      <h4 className="text-base leading-snug font-semibold">{title}</h4>
      <dl className="mt-1 grid gap-x-6 gap-y-1 text-[0.9375rem] sm:mt-3 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-y-3">
        {rows.map(([term, detail]) => (
          <div key={term} className="contents">
            <dt className="text-muted mt-2 font-medium sm:mt-0">{term}</dt>
            <dd className="min-w-0">{detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
