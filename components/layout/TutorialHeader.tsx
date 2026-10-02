import { site } from "@/config/site";

export function TutorialHeader() {
  const meta = [
    { label: "By", value: site.author },
    { label: "Published", value: site.published },
    ...site.versions,
  ];

  return (
    <header className="mb-(--section-space)">
      <h1 className="max-w-[18ch] text-[clamp(2rem,1.25rem+3.2vw,3.5rem)] leading-[1.08] font-bold tracking-[-0.03em] text-balance">
        {site.title}
      </h1>
      <p className="text-muted mt-5 max-w-[40rem] text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] leading-relaxed text-pretty">
        {site.description}
      </p>
      <dl className="border-line mt-8 grid max-w-[48rem] grid-cols-2 gap-x-6 gap-y-4 border-y py-4 text-sm sm:flex sm:flex-wrap sm:gap-x-8 sm:gap-y-2">
        {meta.map((item) => (
          <div key={item.label} className="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:gap-1.5">
            <dt className="text-muted">{item.label}</dt>
            <dd className="font-medium">{item.value}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
