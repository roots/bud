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
  ].some(match => file.name.includes(match))

export const isBudConfig = (file: File): boolean =>
  file.name.includes(`bud`)
