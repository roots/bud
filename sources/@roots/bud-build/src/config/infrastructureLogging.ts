import type {Factory} from './index.js'

export const infrastructureLogging: Factory<
  `infrastructureLogging`
> = async bud =>
  bud.hooks.filter(`build.infrastructureLogging`, {
    console: bud.hooks.filter(`build.infrastructureLogging.console`, {
      ...console,
      log: bud.context.logger.log,
      info: bud.context.logger.info,
      warn: bud.context.logger.warn,
      error: bud.context.logger.error,
      debug: bud.context.logger.debug,
      time: bud.context.logger.time,
      timeEnd: bud.context.logger.timeEnd,
    }),
    level: bud.hooks.filter(
      `build.infrastructureLogging.level`,
      bud.context.args.verbose ? `log` : `info`,
    ),
  })
