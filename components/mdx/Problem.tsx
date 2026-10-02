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
    <section className="border-line rounded-xl border p-5" aria-label={title}>
      <h4 className="text-base font-semibold">{title}</h4>
      <dl className="mt-3 grid gap-x-6 gap-y-3 text-[0.97rem] sm:grid-cols-[9rem_1fr]">
        {rows.map(([term, detail]) => (
          <div key={term} className="contents">
            <dt className="text-muted font-medium">{term}</dt>
            <dd className="min-w-0">{detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
