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
        logger.scope(`bud.js`)
      },
      warn: (...args: any[]) => {
        logger.scope(`webpack`).info(...args)
        logger.scope(`bud.js`)
      },
      error: (...args: any[]) => {
        logger.scope(`webpack`).error(...args)
        logger.scope(`bud.js`)
      },
      info: (...args: any[]) => {
        logger.scope(`webpack`).info(...args)
        logger.scope(`bud.js`)
      },
    }),
    level: bud.hooks.filter(`build.infrastructureLogging.level`, `log`),
  })
