import {Bud} from '../..'
import {isFunction} from '../cli.dependencies'

export const configSet = async (app: Bud, key: string) => {
  if (!app.project.has(key)) return

  const configs = app.project.get(key)
  if (!configs || !configs.length) return

  await Promise.all(
    configs.map(async config => {
      await Promise.all(
        Object.entries(config).map(async ([key, value]) => {
          const request = app[key]

          app.log(key, `called on`, app.name)

          if (isFunction(request)) {
            await request(value)
          }

          return
        }),
      )
    }),
  )
}

export const configs = async (app, configKey) => {
  await configSet(app, 'configs.json.global')
  await app.extensions.processQueue()

  await configSet(app, 'configs.json.conditional')
  await app.extensions.processQueue()
}
