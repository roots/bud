import type { File } from "@roots/bud-framework/context";

export const isBuildDependency = (file: File): boolean => [
  `config`,
  `npm`,
  `package`,
  `pnpm`,
  `rc`,
  `yarn`,
].includes(file.name) || file.path.includes(`config`) || file.bud
