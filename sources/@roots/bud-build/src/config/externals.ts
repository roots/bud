import type {Factory} from '@roots/bud-build/config'

export const externals: Factory<`externals`> = async app =>
  app.hooks.filter(`build.externals`, undefined)
