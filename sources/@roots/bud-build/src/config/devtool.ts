import type {ValueFactory} from './builder'

export const devtool: ValueFactory<`devtool`> = async app =>
  app.hooks.filter(`build.devtool`)
