import type {Factory} from './index.js'

export const stats: Factory<`stats`> = async app =>
  app.hooks.filter(`build.stats`, {preset: `errors-only`})
