import type {Factory} from '@roots/bud-build/config'

import logger from '@roots/bud-support/logger'

export const infrastructureLogging: Factory<
  `infrastructureLogging`
> = async bud =>
  bud.hooks.filter(`build.infrastructureLogging`, {
    console: bud.hooks.filter(`build.infrastructureLogging.console`, {
      ...console,
      error: (...args: any[]) => {
        logger.scope(bud.label, `webpack`).error(...args)
      },
      info: (...args: any[]) => {
        logger.scope(bud.label, `webpack`).info(...args)
      },
      log: (...args: any[]) => {
        logger.scope(bud.label, `webpack`).log(...args)
      },
      warn: (...args: any[]) => {
        logger.scope(bud.label, `webpack`).info(...args)
      },
    }),
    level: bud.hooks.filter(`build.infrastructureLogging.level`, `log`),
  })
