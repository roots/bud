import logger from '@roots/bud-support/utilities/logger'

import type {Factory} from './index.js'

export const infrastructureLogging: Factory<
  `infrastructureLogging`
> = async bud =>
  bud.hooks.filter(`build.infrastructureLogging`, {
    console: bud.hooks.filter(`build.infrastructureLogging.console`, {
      ...console,
      log: (...args: any[]) => {
        logger.scope(`webpack`).log(...args)
      },
      warn: (...args: any[]) => {
        logger.scope(`webpack`).info(...args)
      },
      error: (...args: any[]) => {
        logger.scope(`webpack`).error(...args)
      },
      info: (...args: any[]) => {
        logger.scope(`webpack`).info(...args)
      },
    }),
    level: bud.hooks.filter(`build.infrastructureLogging.level`, `log`),
  })
