import type {Bud} from '@roots/bud'

export const isInternalDevelopmentEnv = (bud: Bud) =>
  bud.context?.bud?.version === `0.0.0`
