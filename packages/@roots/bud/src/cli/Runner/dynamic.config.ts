import {isFunction} from 'lodash'

import {Bud} from '../..'

export const config = async (app: Bud) => {
  if (app.project.isFunction('configs.dynamic.global.config')) {
    const config = app.project.get(
      'configs.dynamic.global.config',
    )

    if (isFunction(config)) {
      app.info(
        `Running ${app.name} global configuration callback`,
      )

      await config(app)
    }
  }

  await app.extensions.processQueue()

  if (
    app.project.isFunction('configs.dynamic.conditional.config')
  ) {
    const config = app.project.get(
      'configs.dynamic.conditional.config',
    )

    if (isFunction(config)) {
      app.info(
        `Running ${app.name} ${app.mode} configuration callback`,
      )

      await config(app)
    }
  }

  await app.extensions.processQueue()
}
