import sortBy from '@roots/bud-support/lodash/sortBy'

import type {Bud} from '../bud.js'
import Configuration from './configuration.js'

/**
 * Process configurations
 * @public
 */
export const process = async (app: Bud) => {
  const findConfigs = (ofType: string, isLocal: boolean) =>
    sortBy(
      configs
        .filter(({type}) => type === ofType)
        .filter(({local}) => local === isLocal),
      `name`,
    )

  const configuration = new Configuration(app)
  const configs = Object.values(app.context.config).filter(({bud}) => bud)

  try {
    await Promise.all(
      findConfigs(`base`, false).map(async description => {
        app.log(`processing base configuration`, description.name)
        try {
          await configuration.run(description)
        } catch (error) {
          const err = new Error(error?.toString() ?? ``)
          err.name = `Configuration Error: ${description.name}`
          throw err
        }
      }),
    ).then(async () => await app.api.processQueue())

    await Promise.all(
      findConfigs(`base`, true).map(async description => {
        app.log(`processing local configuration`, description.name)
        try {
          await configuration.run(description)
        } catch (error) {
          const err = new Error(error?.toString() ?? ``)
          err.name = `Configuration Error: ${description.name}`
          throw err
        }
      }),
    ).then(async () => await app.api.processQueue())

    await Promise.all(
      findConfigs(app.mode, false).map(async description => {
        app.log(`processing ${app.mode} configuration`, description.name)
        try {
          await configuration.run(description)
        } catch (error) {
          const err = new Error(error?.toString() ?? ``)
          err.name = `Configuration Error: ${description.name}`
          throw err
        }
      }),
    ).then(async () => await app.api.processQueue())

    await Promise.all(
      findConfigs(app.mode, true).map(async description => {
        app.log(
          `processing ${app.mode} local configuration`,
          description.name,
        )
        try {
          await configuration.run(description)
        } catch (error) {
          const err = new Error(error?.toString() ?? ``)
          err.name = `Configuration Error: ${description.name}`
          throw err
        }
      }),
    ).then(async () => await app.api.processQueue())
  } catch (error) {
    throw error
  }

  try {
    await app.hooks.fire(`config.after`)
  } catch (error) {
    const err = new Error(error?.toString() ?? ``)
    err.name = `Post configuration error`
    throw err
  }

  if (app.hasChildren) {
    await Promise.all(
      Object.values(app.children).map(async child => {
        try {
          await child.api.processQueue()
          await child.hooks.fire(`config.after`)
        } catch (error) {
          const err = new Error(error?.toString() ?? ``)
          err.name = `Post config: error processing ${child.label}`
          throw err
        }
      }),
    )
  }
}
