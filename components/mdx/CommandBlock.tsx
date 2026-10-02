import { CodeFrame } from "./CodeFrame";

/** A single shell command with a prompt that is not copied. */
export function CommandBlock({ command }: { command: string }) {
  return (
    <CodeFrame label="Terminal" copyText={command} copyWhat="command">
      <pre tabIndex={0}>
        <code>
          <span aria-hidden="true" className="text-muted select-none">
            ${" "}
          </span>
          {command}
        </code>
      </pre>
    </CodeFrame>
  );
}
