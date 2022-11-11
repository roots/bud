import type {ValueFactory} from './builder.js'

export const experiments: ValueFactory<`experiments`> = async app =>
  app.hooks.filter(`build.experiments`)
