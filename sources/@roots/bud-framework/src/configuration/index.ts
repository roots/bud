import {sortBy} from '@roots/bud-support/lodash-es'

import type {Bud} from '../bud'
import Configuration from './configuration.js'

/**
 * Process configurations
 * @public
 */
export const process = async (app: Bud) => {
  const configuration = new Configuration(app)

  const configs = Object.values(app.context.config).filter(({bud}) => bud)

  const getAllMatchingConfigs = (ofType: string, isLocal: boolean) =>
    sortBy(
      configs
        .filter(({type}) => type === ofType)
        .filter(({local}) => local === isLocal),
      `name`,
    )

  await Promise.all(
    getAllMatchingConfigs(`base`, false).map(async description => {
      app.log(`processing base configuration`, description.name)
      await configuration.run(description)
    }),
  ).then(async () => await app.api.processQueue())

  await Promise.all(
    getAllMatchingConfigs(`base`, true).map(async description => {
      app.log(`processing local configuration`, description.name)
      await configuration.run(description)
    }),
  ).then(async () => await app.api.processQueue())

  await Promise.all(
    getAllMatchingConfigs(app.mode, false).map(async description => {
      app.log(`processing ${app.mode} configuration`, description.name)

      await configuration.run(description)
    }),
  ).then(async () => await app.api.processQueue())

  await Promise.all(
    getAllMatchingConfigs(app.mode, true).map(async description => {
      app.log(
        `processing ${app.mode} local configuration`,
        description.name,
      )
      await configuration.run(description)
    }),
  ).then(async () => await app.api.processQueue())

  try {
    await app.hooks.fire(`config.after`)
  } catch (err) {
    throw err
  }

  if (app.hasChildren) {
    try {
      await Promise.all(
        Object.values(app.children).map(async child => {
          await child.api.processQueue()
          await child.hooks.fire(`config.after`)
        }),
      )
    } catch (error) {
      throw error
    }
  }
}
