import { ArrowIcon } from "@/components/icons";

type Node = { title: string; note: string; highlight?: boolean };
type LaneData = { id: string; heading: string; command: string; nodes: Node[]; result: string };

const lanes: LaneData[] = [
  {
    id: "record",
    heading: "Record",
    command: "keploy record",
    nodes: [
      { title: "You", note: "send requests with curl" },
      { title: "Keploy proxy", note: "watches the traffic", highlight: true },
      { title: "Go app", note: "handles the request" },
      { title: "MongoDB", note: "real database" },
    ],
    result: "Saved to keploy/: test cases and mocks as YAML",
  },
  {
    id: "replay",
    heading: "Replay",
    command: "keploy test",
    nodes: [
      { title: "Keploy", note: "sends saved requests", highlight: true },
      { title: "Go app", note: "handles the request" },
      { title: "Keploy mocks", note: "answer for MongoDB", highlight: true },
    ],
    result: "Responses compared with the saved ones: pass or fail",
  },
];

function Lane({ id, heading, command, nodes, result }: LaneData) {
  return (
    <section aria-labelledby={`lane-${id}`} className="border-line rounded-xl border p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 id={`lane-${id}`} className="mt-0 text-base font-semibold">
          {heading}
        </h3>
        <code className="text-muted font-mono text-sm">{command}</code>
      </div>
      <ol className="mt-4 flex flex-col items-stretch gap-2 md:flex-row md:items-center">
        {nodes.map((node, i) => (
          <li key={node.title} className="flex flex-col items-center gap-2 md:flex-1 md:flex-row">
            <div
              className={`w-full flex-1 rounded-lg border px-3 py-2 ${
                node.highlight ? "border-accent bg-accent/10" : "border-line bg-surface"
              }`}
            >
              <p className="text-sm font-semibold">{node.title}</p>
              <p className="text-muted text-sm">{node.note}</p>
            </div>
            {i < nodes.length - 1 ? (
              <ArrowIcon className="text-muted shrink-0 rotate-90 md:rotate-0" />
            ) : null}
          </li>
        ))}
      </ol>
      <p className="text-muted mt-3 text-sm">{result}</p>
    </section>
  );
}

export function WorkflowDiagram() {
  return (
    <figure className="space-y-3" aria-label="Record and replay workflow">
      {lanes.map((lane) => (
        <Lane key={lane.id} {...lane} />
      ))}
      <figcaption className="text-muted text-sm">
        Highlighted boxes are the parts Keploy adds. Your app code stays as it is.
      </figcaption>
    </figure>
  );
}
