import type {ValueFactory} from './builder.js'

export const bail: ValueFactory<'bail'> = async app =>
  app.hooks.filter(`build.bail`, app.isProduction)
