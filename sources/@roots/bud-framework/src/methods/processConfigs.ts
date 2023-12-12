import type {Bud} from '@roots/bud-framework'
import type {File} from '@roots/bud-framework/context'

import Configuration from '@roots/bud-framework/configuration'
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
    logger.scope(`config`).log(`processing`, file.name)

    await this.resolvePromises()
      .then(async () => {
        await configuration.run(file).catch(this.catch)
      })
      .catch(this.catch)
  }

  await Promise.all(find(`base`, false).map(processConfig)).catch(
    this.catch,
  )
  await Promise.all(find(`base`, true).map(processConfig)).catch(
    this.catch,
  )
  await Promise.all(find(this.mode, false).map(processConfig)).catch(
    this.catch,
  )
  await Promise.all(find(this.mode, true).map(processConfig)).catch(
    this.catch,
  )

  await this.executeServiceCallbacks(`config.after`).catch(this.catch)

  if (!this.hasChildren) return

  await Promise.all(
    Object.values(this.children).map(async child => {
      await child.tapAsync(async bud => {
        await bud.executeServiceCallbacks(`config.after`).catch(this.catch)
      })
    }),
  ).catch(this.catch)

  return this
}
