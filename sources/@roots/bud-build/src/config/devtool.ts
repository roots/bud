import type {ValueFactory} from './builder.js'

export const devtool: ValueFactory<`devtool`> = async app =>
  app.hooks.filter(`build.devtool`)
