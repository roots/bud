import type {Bud} from '@roots/bud-framework'

export const isInternalDevelopmentEnv = (bud: Bud) => bud.env.has(`BUD_DEVELOPMENT_ENV`)
