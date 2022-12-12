import type {Factory} from './index.js'

export const infrastructureLogging: Factory<
  `infrastructureLogging`
> = async bud =>
  bud.hooks.filter(`build.infrastructureLogging`, {
    console: bud.hooks.filter(`build.infrastructureLogging.console`, {
      ...console,
      log: bud.logger.instance.log,
      info: bud.logger.instance.info,
      warn: bud.logger.instance.warn,
      error: bud.logger.instance.error,
      debug: bud.logger.instance.debug,
    }),
    level: bud.hooks.filter(
      `build.infrastructureLogging.level`,
      getLevel(bud.context.args.level),
    ),
  })

const getLevel = (level?: number) => {
  if (typeof level !== `number`) return `info`

  const levels: [`error`, `warn`, `info`, `log`] = [
    `error`,
    `warn`,
    `info`,
    `log`,
  ]

  return levels[level - 1]
}
