import {Signale} from '@roots/bud-support'

import {Bud} from '../../..'
import {isFunction} from '../../cli.dependencies'

/**
 * @internal
 */
export const configSet = async (
  app: Bud,
  logger: Signale,
  config: Record<string, any>,
) => {
  await Promise.all(
    Object.entries(config).map(async ([key, value]) => {
      const request = app[key]

      logger.log(key, `called on`, app.name)

      if (isFunction(request)) {
        await request(value)
      }

      return
    }),
  )
}

/**
 * @internal
 */
export const configs = async (app: Bud, logger: Signale) => {
  const generalConfigs = app.project.get('configs.json.global')
  const conditionalConfigs = app.project.get('configs.json.conditional')

  app.dump(generalConfigs, {
    prefix: 'retrieved static config (global)',
  })
  app.dump(generalConfigs, {
    prefix: 'retrieved static config (conditional)',
  })

  if (generalConfigs) {
    await configSet(app, logger, generalConfigs)
    await app.api.processQueue()
    await app.extensions.processQueue()
  }

  if (conditionalConfigs) {
    await configSet(app, logger, conditionalConfigs)
    await app.api.processQueue()
    await app.extensions.processQueue()
  }
}
