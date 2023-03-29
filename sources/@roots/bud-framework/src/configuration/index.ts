import {asError, BudError, ConfigError} from '@roots/bud-support/errors'
import sortBy from '@roots/bud-support/lodash/sortBy'

import type {Bud} from '../bud.js'
import Configuration from './configuration.js'

/**
 * Process configurations
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
  const configs = Object.values(app.context.files).filter(({bud}) => bud)

  // process any queued api calls
  await app.api.processQueue()

  await Promise.all(
    findConfigs(`base`, false).map(async description => {
      app.log(`processing base configuration`, description.name)

      try {
        await configuration.run(description)
      } catch (err) {
        throw new ConfigError(`Error in ${description.name}`, {
          props: {
            origin: err.isBudError ? err : BudError.normalize(err),
            file: description,
          },
        })
      }

      try {
        await app.api.processQueue()
      } catch (err) {
        throw new ConfigError(`Error in ${description.name}`, {
          props: {
            origin: err.isBudError ? err : BudError.normalize(err),
            file: description,
          },
        })
      }
    }),
  )

  await Promise.all(
    findConfigs(`base`, true).map(async description => {
      app.log(`processing local configuration`, description.name)

      try {
        await configuration.run(description)
      } catch (err) {
        throw new ConfigError(`Error in ${description.name}`, {
          props: {
            origin: err.isBudError ? err : BudError.normalize(err),
            file: description,
          },
        })
      }

      try {
        await app.api.processQueue()
      } catch (err) {
        throw new ConfigError(`Error in ${description.name}`, {
          props: {
            origin: err.isBudError ? err : BudError.normalize(err),
            file: description,
          },
        })
      }
    }),
  )

  await Promise.all(
    findConfigs(app.mode, false).map(async description => {
      app.log(`processing ${app.mode} configuration`, description.name)
      try {
        await configuration.run(description)
      } catch (err) {
        throw new ConfigError(`Error in ${description.name}`, {
          props: {
            origin: err.isBudError ? err : BudError.normalize(err),
            file: description,
          },
        })
      }

      try {
        await app.api.processQueue()
      } catch (err) {
        throw new ConfigError(`Error in ${description.name}`, {
          props: {
            origin: err.isBudError ? err : BudError.normalize(err),
            file: description,
          },
        })
      }
    }),
  )

  await Promise.all(
    findConfigs(app.mode, true).map(async description => {
      app.log(
        `processing ${app.mode} local configuration`,
        description.name,
      )
      try {
        await configuration.run(description)
      } catch (err) {
        throw new ConfigError(`Error in ${description.name}`, {
          props: {
            origin: err.isBudError ? err : BudError.normalize(err),
            file: description,
          },
        })
      }
      try {
        await app.api.processQueue()
      } catch (err) {
        throw new ConfigError(`Error in ${description.name}`, {
          props: {
            origin: err.isBudError ? err : BudError.normalize(err),
            file: description,
          },
        })
      }
    }),
  )

  try {
    await app.hooks.fire(`config.after`, app)
  } catch (err) {
    throw err.isBudError ? err : BudError.normalize(err)
  }

  if (app.hasChildren) {
    await Promise.all(
      Object.values(app.children).map(async child => {
        try {
          await child.api.processQueue()
          await child.hooks.fire(`config.after`, app)
        } catch (err) {
          throw new BudError(asError(err).message)
        }
      }),
    )
  }
}
