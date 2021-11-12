import {isFunction} from 'lodash'

import {Bud} from '../..'

export const config = async (app: Bud, key: string) => {
  if (!app.project.has(key)) return

  const configs = app.project.get(key)
  if (!configs || !configs.length) return

  const logger = app.logger.scoped('cli')

  const handleConfig = async config => {
    const logPrefix = config.split('/').pop()
    logger.await({prefix: logPrefix, message: 'import'})

    try {
      config.endsWith('.ts')
        ? await app.ts.read(config)
        : await import(config)

      logger.success({prefix: logPrefix, message: 'import'})
    } catch (e) {
      logger.error({
        prefix: logPrefix,
        message: 'error',
        suffix: e,
      })
    }

    const rawImport = config.endsWith('.ts')
      ? await app.ts.read(config)
      : await import(config)

    const configTap = isFunction(rawImport?.default)
      ? rawImport.default
      : rawImport

    if (isFunction(configTap)) {
      logger.await({prefix: logPrefix, message: 'callback'})
      await configTap(app)
      logger.success({prefix: logPrefix, message: 'callback'})
    }
  }

  Array.isArray(configs)
    ? await Promise.all(configs.map(handleConfig))
    : await handleConfig(configs)
}

export const configs = async (app: Bud) => {
  await config(app, 'configs.dynamic.global')
  await app.extensions.processQueue()

  await config(app, 'configs.dynamic.conditional')
  await app.extensions.processQueue()
}
