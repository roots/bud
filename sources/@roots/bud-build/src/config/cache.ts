import type {ValueFactory} from './builder'

export const cache: ValueFactory<`cache`> = async app =>
  app.hooks.filter(`build.cache`, app.cache.configuration)
