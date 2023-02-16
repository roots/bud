import type {Bud} from '@roots/bud-framework'

export const isInternalDevelopmentEnv = (bud: Bud) =>
  bud.context?.bud?.version === `0.0.0`
