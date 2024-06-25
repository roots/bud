import type {Bud} from '@roots/bud-framework'
import type {File} from '@roots/bud-framework/context'

import Configuration from '@roots/bud-framework/configuration'
import {BudError} from '@roots/bud-support/errors'
import logger from '@roots/bud-support/logger'
import sortBy from '@roots/bud-support/sortBy'

/**
 * Process user configurations
 */
export interface processConfigs {
  (): Promise<Bud>
}

export const processConfigs: processConfigs = async function (this: Bud) {
  const configuration = new Configuration(this)

  const find = (isTarget: string, isLocal: boolean) =>
    sortBy(
      Object.values(this.context.files)
        .filter(({bud}) => bud)
        .filter(({target}) => isTarget === target)
        .filter(({local}) => local === isLocal),
      `name`,
    )

  const processConfig = async (file: File) => {
    logger.scope(`config`).log(`Processing:`, file.path)

    await this.resolvePromises()

    await configuration.run(file).catch(error => {
      throw BudError.normalize(
        `Error parsing ${file.name}: ${BudError.normalize(error).message}`,
        {
          file,
          origin: error,
          thrownBy: import.meta.url,
        },
      )
    })
  }

  await Promise.all(find(`base`, false).map(processConfig))
  await Promise.all(find(`base`, true).map(processConfig))
  await Promise.all(find(this.mode, false).map(processConfig))
  await Promise.all(find(this.mode, true).map(processConfig))

  await this.executeServiceCallbacks(`config.after`).catch(origin => {
    this.catch(
      BudError.normalize(`Error running hook: config.after`, {
        details: `This is likely an error in the project bud configuration.`,
        docs: new URL(`https://bud.js.org/learn/config/files/bud.config`),
        origin,
        thrownBy: import.meta.url,
      }),
    )
  })

  if (!this.hasChildren) return

  await Promise.all(
    Object.values(this.children).map(async child => {
      await child.tapAsync(async child => {
        await child
          .executeServiceCallbacks(`config.after`)
          .catch(origin => {
            this.catch(
              BudError.normalize(
                `Error executing service callback: config.after`,
                {
                  details: `This is likely an error in the project bud configuration.`,
                  docs: new URL(
                    `https://bud.js.org/learn/config/files/bud.config`,
                  ),
                  instance: child.label,
                  origin,
                  thrownBy: import.meta.url,
                },
              ),
            )
          })
      })
    }),
  )

  return this
}
