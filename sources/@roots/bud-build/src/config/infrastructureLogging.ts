import type {ValueFactory} from './builder.js'

export const infrastructureLogging: ValueFactory<
  `infrastructureLogging`
> = async app =>
  app.hooks.filter(`build.infrastructureLogging`, {
    console: app.hooks.filter(
      `build.infrastructureLogging.console`,
      undefined,
    ),
    level: app.hooks.filter(`build.infrastructureLogging.level`, `none`),
  })
