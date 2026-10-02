import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/mdx/Callout";
import { Checkpoint } from "@/components/mdx/Checkpoint";
import { CodeBlock, CodeFigure } from "@/components/mdx/CodeBlock";
import { CommandBlock } from "@/components/mdx/CommandBlock";
import { Problem } from "@/components/mdx/Problem";
import { Step } from "@/components/mdx/Step";
import { WorkflowDiagram } from "@/components/mdx/WorkflowDiagram";

const components = {
  figure: CodeFigure,
  pre: CodeBlock,
  Callout,
  Checkpoint,
  CommandBlock,
  Problem,
  Step,
  WorkflowDiagram,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
