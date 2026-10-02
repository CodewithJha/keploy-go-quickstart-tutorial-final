import type { ReactNode } from "react";
import { CopyButton } from "./CopyButton";
import { ScrollHint } from "./ScrollHint";

/** Shared chrome for code: a label and copy button in a toolbar above the scrolling `<pre>`. */
export function CodeFrame({
  label,
  copyText,
  copyWhat,
  children,
}: {
  label: ReactNode;
  copyText: string;
  copyWhat?: string;
  children: ReactNode;
}) {
  return (
    <div className="code-block code-surface">
      <div className="code-toolbar">
        <span className="code-label">{label}</span>
        <ScrollHint />
        <CopyButton text={copyText} what={copyWhat} />
      </div>
      {children}
    </div>
  );
}
