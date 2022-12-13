import {sortBy} from '@roots/bud-support/lodash-es'

import type {Bud} from '../bud.js'
import type {ConfigDescription} from '../types/options/context.js'
import Configuration from './configuration.js'

/**
 * Process configurations
 * @public
 */
export const process = async (app: Bud) => {
  if (!app.context.config) return

  const configs = Object.values(app.context.config).filter(({bud}) => bud)
  if (!configs.length) return

  const configuration = new Configuration(app)
  const findConfigs = getAllMatchingConfigs.bind(configs)

  await Promise.all(
    findConfigs(`base`, false).map(async description => {
      app.log(`processing base configuration`, description.name)
      await configuration.run(description)
    }),
  ).then(async () => await app.api.processQueue())

  await Promise.all(
    findConfigs(`base`, true).map(async description => {
      app.log(`processing local configuration`, description.name)
      await configuration.run(description)
    }),
  ).then(async () => await app.api.processQueue())

  await Promise.all(
    findConfigs(app.mode, false).map(async description => {
      app.log(`processing ${app.mode} configuration`, description.name)
      await configuration.run(description)
    }),
  ).then(async () => await app.api.processQueue())

  await Promise.all(
    findConfigs(app.mode, true).map(async description => {
      app.log(
        `processing ${app.mode} local configuration`,
        description.name,
      )
      await configuration.run(description)
    }),
  ).then(async () => await app.api.processQueue())

  try {
    await app.hooks.fire(`config.after`)
  } catch (error) {
    throw error
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

export function getAllMatchingConfigs(
  this: Array<ConfigDescription>,
  ofType: string,
  isLocal: boolean,
) {
  return sortBy(
    this.filter(({type}) => type === ofType).filter(
      ({local}) => local === isLocal,
    ),
    `name`,
  )
}
