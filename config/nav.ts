import { site } from "./site";

export const navLinks = [
  { label: "Keploy docs", href: "https://keploy.io/docs/" },
  { label: "Original quickstart", href: site.quickstartUrl },
  { label: "Source", href: site.repoUrl },
] as const;
