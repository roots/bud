import type {File} from '@roots/bud-framework/context'

export const isBuildDependency = (file: File): boolean =>
  [
    `.npmrc`,
    `.pnpmfile`,
    `.yarnrc`,
    `jsconfig`,
    `package`,
    `pnpm-workspace`,
    `tsconfig`,
  ].includes(file.name) || file.bud
