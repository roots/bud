import type {File} from '@roots/bud-framework/context'

import {BudError, ConfigError} from '@roots/bud-support/errors'
import sortBy from '@roots/bud-support/lodash/sortBy'

import type {Bud} from '../index.js'

import Configuration from './configuration.js'

/**
 * Process configurations
 */
export const process = async (app: Bud) => {
  const configuration = new Configuration(app)

  const configs: Array<File> = Object.values(app.context.files).filter(
    ({bud}) => bud,
  )

  const find = (isTarget: string, isLocal: boolean) =>
    sortBy(
      configs
        .filter(({target}) => target === isTarget)
        .filter(({local}) => local === isLocal),
      `name`,
    )

  const processConfig = async (file: File) => {
    app.log(`processing`, file.name)
    await configuration.run(file).catch(makeErrorHandler(file))
    await app.api.processQueue().catch(makeErrorHandler(file))
  }

  // process any queued api calls
  await app.api.processQueue()

  await Promise.all(find(`base`, false).map(processConfig))
  await Promise.all(find(`base`, true).map(processConfig))
  await Promise.all(find(app.mode, false).map(processConfig))
  await Promise.all(find(app.mode, true).map(processConfig))

  await app.executeServiceCallbacks(`config.after`).catch(error => {
    throw error
  })

  if (!app.hasChildren) return

  await Promise.all(
    Object.values(app.children).map(async child => {
      await child.api.processQueue().catch(error => {
        throw error
      })
      await child.executeServiceCallbacks(`config.after`).catch(error => {
        throw error
      })
    }),
  )
}

const makeErrorHandler =
  (file: File) => (error: Error & {isBudError?: boolean}) => {
    throw new ConfigError(`Error in ${file.name}`, {
      props: {
        file,
        origin:
          error instanceof BudError ? error : BudError.normalize(error),
      },
    })
  }
