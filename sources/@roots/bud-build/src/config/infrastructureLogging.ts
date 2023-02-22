import type {Factory} from './index.js'

export const infrastructureLogging: Factory<
  `infrastructureLogging`
> = async bud => {
  const logger = bud.context.logger.make(`webpack`).instance
  return bud.hooks.filter(`build.infrastructureLogging`, {
    console: bud.hooks.filter(`build.infrastructureLogging.console`, {
      ...console,
      ...logger,
    }),
    level: bud.hooks.filter(`build.infrastructureLogging.level`, `log`),
  })
}
