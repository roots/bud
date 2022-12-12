import type {Factory} from './index.js'

export const loader: Factory<`loader`> = async app =>
  app.hooks.filter(`build.loader`)
