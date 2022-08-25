import Console from 'console'

import type {ValueFactory} from './builder'

export const infrastructureLogging: ValueFactory<
  `infrastructureLogging`
> = async app =>
  app.hooks.filter(`build.infrastructureLogging`, {
    console: app.hooks.filter(
      `build.infrastructureLogging.console`,
      Console,
    ),
    level: app.hooks.filter(`build.infrastructureLogging.level`, `none`),
  })
