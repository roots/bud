import type {Factory} from './index.js'

export const profile: Factory<`profile`> = async app =>
  app.hooks.filter(`build.profile`, undefined)
