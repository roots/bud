import {isFunction} from 'lodash'

import {Bud} from '../..'

export const config = async (app: Bud, key: string) => {
  if (!app.project.has(key)) return

  const configs = app.project.get(key)
  if (!configs || !configs.length) return

  app.dump(configs)

  const handleConfig = async config => {
    app.await('Reading', config)

    try {
      config.endsWith('.ts')
        ? await app.ts.read(config)
        : await import(config)
    } catch (e) {
      app.error(`${config} could not be imported`)
      app.error(e)
    }

    const rawImport = config.endsWith('.ts')
      ? await app.ts.read(config)
      : await import(config)

    app.dump(rawImport)

    const configTap = isFunction(rawImport?.default)
      ? rawImport.default
      : rawImport

    if (isFunction(configTap)) {
      app.info(
        `Running ${app.name} global configuration callback`,
        key,
      )

      await configTap(app)
    }
  }

  Array.isArray(configs)
    ? await Promise.all(configs.map(handleConfig))
    : handleConfig(configs)
}

export const configs = async (app: Bud) => {
  await config(app, 'configs.dynamic.global')
  await app.extensions.processQueue()

  await config(app, 'configs.dynamic.conditional')
  await app.extensions.processQueue()
}
