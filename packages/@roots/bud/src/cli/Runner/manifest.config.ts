import {Bud} from '../..'
import {isFunction} from '../cli.dependencies'

export const config = async (app: Bud) => {
  if (app.project.has('configs.static.conditional.config')) {
    const config = app.project.get(
      'configs.static.conditional.config',
    )

    Object.entries(config).forEach(([c, v]) => {
      app.log(`parsed compiler ${c}`)

      Object.entries(v).forEach(([k, v]) => {
        app.log(`setting ${k} to`, typeof v)
      })
    })

    await Object.entries(config).reduce(
      async (
        promised,
        [name, values]: [string, Record<string, any>],
      ) => {
        await promised
        app.log(
          `parsing ${name} settings from static configuration(s)`,
        )

        await app.make(name, async instance => {
          Object.entries(values)
            .filter(([key]) => key !== 'extensions')
            .forEach(([key, value]) => {
              const item = instance[key]

              if (key === 'settings') {
                app.log(
                  `setting ${key} on ${instance.name} to`,
                  value,
                )

                return instance.store.set(key, value)
              }

              if (!item) {
                return app.warn(
                  `config key ${key} for ${instance} has no match and is ignored`,
                )
              }

              if (isFunction(item)) {
                app.log(
                  `calling ${key} function on the ${instance.name} compiler`,
                )

                return item(value)
              }
            })
        })

        return Promise.resolve()
      },
      Promise.resolve(),
    )
  }
}
