import { CopyButton } from "./CopyButton";

/** A single shell command with a prompt that is not copied. */
export function CommandBlock({ command }: { command: string }) {
  return (
    <div className="relative">
      <div className="code-surface">
        <pre tabIndex={0} className="pr-28">
          <code>
            <span aria-hidden="true" className="text-muted select-none">
              ${" "}
            </span>
            {command}
          </code>
        </pre>
      </div>
      <div className="absolute top-1/2 right-1.5 -translate-y-1/2">
        <CopyButton text={command} label="Copy command" />
      </div>
    </div>
  );
}
