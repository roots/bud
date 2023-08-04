import type {Factory} from '@roots/bud-build/config'

export const loader: Factory<`loader`> = async app =>
  app.hooks.filter(`build.loader`)
