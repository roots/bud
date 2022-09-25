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

  const getAllMatchingConfigs = (reqType: string, reqLocal: boolean) =>
    sortBy(
      configs
        .filter(({type}) => type === reqType)
        .filter(({local}) => local === reqLocal),
      `name`,
    )

  await Promise.all(
    getAllMatchingConfigs(`base`, false).map(async description => {
      await configuration.run(description)
    }),
  ).then(async () => await app.api.processQueue())

  await Promise.all(
    getAllMatchingConfigs(`base`, true).map(async description => {
      await configuration.run(description)
    }),
  ).then(async () => await app.api.processQueue())

  await Promise.all(
    getAllMatchingConfigs(app.mode, false).map(async description => {
      await configuration.run(description)
    }),
  ).then(async () => await app.api.processQueue())

  await Promise.all(
    getAllMatchingConfigs(app.mode, true).map(async description => {
      await configuration.run(description)
    }),
  ).then(async () => await app.api.processQueue())

  try {
    await app.hooks
      .fire(`config.after`)
      .then(async () => await app.api.processQueue())
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
