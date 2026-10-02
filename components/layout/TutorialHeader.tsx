import { site } from "@/config/site";

export function TutorialHeader() {
  return (
    <div className="mb-14 max-w-3xl">
      <h1 className="text-4xl leading-[1.1] font-bold tracking-tight text-balance sm:text-5xl">
        {site.title}
      </h1>
      <p className="text-muted mt-5 text-xl leading-relaxed text-pretty">{site.description}</p>
      <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <div className="flex gap-1.5">
          <dt className="text-muted">By</dt>
          <dd className="font-medium">{site.author}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="text-muted">Published</dt>
          <dd className="font-medium">{site.published}</dd>
        </div>
        {site.versions.map((item) => (
          <div key={item.label} className="flex gap-1.5">
            <dt className="text-muted">{item.label}</dt>
            <dd className="font-medium">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
