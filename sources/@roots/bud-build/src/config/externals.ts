import type {Factory} from './index.js'

export const externals: Factory<`externals`> = async app =>
  app.hooks.filter(`build.externals`, undefined)
