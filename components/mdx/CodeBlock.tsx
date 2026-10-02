import type { ComponentPropsWithoutRef } from "react";
import { getText } from "@/lib/get-text";
import { CopyButton } from "./CopyButton";

type PreProps = ComponentPropsWithoutRef<"pre"> & { "data-language"?: string };

/** Replaces `<pre>` in MDX. Syntax highlighting already happened at build time. */
export function CodeBlock({ children, ...props }: PreProps) {
  const language = props["data-language"];
  return (
    <div className="code-block relative">
      <div className="code-surface">
        <pre {...props} tabIndex={0}>
          {children}
        </pre>
      </div>
      <div className="absolute top-1.5 right-1.5 flex items-center gap-1">
        {language && language !== "plaintext" ? (
          <span className="text-muted font-mono text-xs uppercase" aria-hidden="true">
            {language}
          </span>
        ) : null}
        <CopyButton text={getText(children).replace(/\n$/, "")} />
      </div>
    </div>
  );
}
