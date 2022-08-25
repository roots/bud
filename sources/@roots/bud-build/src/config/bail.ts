import type {ValueFactory} from './builder'

export const bail: ValueFactory<'bail'> = async app =>
  app.hooks.filter(`build.bail`, app.isProduction)
