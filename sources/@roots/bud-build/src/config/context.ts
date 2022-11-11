import type {ValueFactory} from './builder.js'

export const context: ValueFactory<`context`> = async app =>
  app.context.basedir
