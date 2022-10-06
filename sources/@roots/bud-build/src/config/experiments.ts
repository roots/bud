import type {ValueFactory} from './builder'

export const experiments: ValueFactory<`experiments`> = async app =>
  app.hooks.filter(`build.experiments`)
