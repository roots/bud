import type {Factory} from '@roots/bud-build/config'

export const stats: Factory<`stats`> = async app =>
  app.hooks.filter(`build.stats`, {preset: `none`})
