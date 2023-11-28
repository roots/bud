import type {Bud} from '@roots/bud-framework'
import type {File} from '@roots/bud-framework/context'

import {bind} from '@roots/bud-support/decorators/bind'
import {BudError, ConfigError} from '@roots/bud-support/errors'

import DynamicConfiguration from './dynamic/index.js'
import StaticConfiguration from './static/index.js'

interface Config {
  ext: File[`ext`]
  module: File[`module`]
  name: File[`name`]
}

/**
 * User config parser
 */
class Configuration {
  /**
   * Class constructor
   */
  public constructor(public bud: Bud) {}

  /**
   * Process configuration
   */
  @bind
  public async run(source: Config): Promise<void> {
    if (!source?.module) {
      throw BudError.normalize(`No module found`, {
        details: `There should be a module here. This is likely an internal error in bud.js.`,
        file: source,
      })
    }

    const config = await source.module().catch(origin => {
      throw ConfigError.normalize(`Error parsing ${source.name}`, {
        file: source,
        origin,
      })
    })

    if (!config) {
      throw ConfigError.normalize(`No configuration found`, {
        file: source,
      })
    }

    if (typeof config === `function`) {
      return await new DynamicConfiguration(this.bud)
        .execute(config)
        .catch(error => {
          throw error
        })
    }

    await new StaticConfiguration(this.bud, `${source.name}${source.ext}`)
      .execute(config)
      .catch(error => {
        throw error
      })
  }
}

export default Configuration
