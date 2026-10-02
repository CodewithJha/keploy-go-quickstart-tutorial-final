import { isValidElement, type ReactNode } from "react";

/** Collects the plain text of a React tree, used to feed the copy buttons. */
export function getText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return getText(node.props.children);
  return "";
}
