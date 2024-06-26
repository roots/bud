import type {Bud} from '@roots/bud-framework'
import type {File} from '@roots/bud-framework/context'

import {bind} from '@roots/bud-support/decorators/bind'
import {BudError} from '@roots/bud-support/errors'

import DynamicConfiguration from './dynamic/index.js'
import StaticConfiguration from './static/index.js'

interface Config {
  ext: File[`ext`]
  module: File[`module`]
  name: File[`name`]
  path: File[`path`]
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
  public async run(file: Config): Promise<void> {
    if (!file?.module) {
      throw BudError.normalize(`No module found: ${file.name}${file.ext}`)
    }

    const config = await file.module().catch(error => {
      throw error
    })

    if (typeof config === `function`) {
      return await new DynamicConfiguration(this.bud).execute(config)
    }

    await new StaticConfiguration(
      this.bud,
      `${file.name}${file.ext}`,
    ).execute(config)
  }
}

export default Configuration
