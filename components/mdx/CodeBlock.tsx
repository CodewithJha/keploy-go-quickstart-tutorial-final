import {
  Children,
  cloneElement,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
} from "react";
import { getText } from "@/lib/get-text";
import { CodeFrame } from "./CodeFrame";

type PreProps = ComponentPropsWithoutRef<"pre"> & { "data-language"?: string; label?: ReactNode };

/** Replaces `<pre>` in MDX. Syntax highlighting already happened at build time. */
export function CodeBlock({ children, label, ...props }: PreProps) {
  const language = props["data-language"];
  const fallback = language && language !== "plaintext" ? language : "Code";
  return (
    <CodeFrame label={label ?? fallback} copyText={getText(children).replace(/\n$/, "")}>
      <pre {...props} tabIndex={0}>
        {children}
      </pre>
    </CodeFrame>
  );
}

type FigureProps = ComponentPropsWithoutRef<"figure"> & {
  "data-rehype-pretty-code-figure"?: string;
};

/**
 * Replaces `<figure>` in MDX. rehype-pretty-code renders a code title as a separate
 * `<figcaption>`; this moves it into the code block's toolbar.
 */
export function CodeFigure({ children, ...props }: FigureProps) {
  if (props["data-rehype-pretty-code-figure"] === undefined) {
    return <figure {...props}>{children}</figure>;
  }
  const items = Children.toArray(children);
  const caption = items.find(
    (child): child is ReactElement<{ children?: ReactNode }> =>
      isValidElement(child) && child.type === "figcaption",
  );
  return (
    <figure {...props}>
      {items.map((child) =>
        child === caption
          ? null
          : isValidElement<PreProps>(child) && caption
            ? cloneElement(child, { label: caption.props.children })
            : child,
      )}
    </figure>
  );
}
