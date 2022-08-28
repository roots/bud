import type {ValueFactory} from './builder'

export const context: ValueFactory<`context`> = async app =>
  app.context.basedir
