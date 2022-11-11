import type {ValueFactory} from './builder.js'

export const cache: ValueFactory<`cache`> = async app =>
  app.hooks.filter(`build.cache`, app.cache.configuration)
