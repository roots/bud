import {bind} from '@roots/bud-support/decorators'
import isFunction from '@roots/bud-support/lodash/isFunction'

import type {Bud} from '../bud.js'
import type {File} from '../types/options/context.js'

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
  public async run(description: File): Promise<unknown> {
    if (!description.module) return

    return description.dynamic
      ? await this.dynamicConfig(description)
      : await this.staticConfig(description)
  }

  /**
   * Process dynamic configuration
   */
  @bind
  public async dynamicConfig(description: any): Promise<unknown> {
    this.bud.log(`processing as dynamic configuration:`, description.name)

    const configCallable =
      description.module?.default ?? description.module

    return await configCallable(this.bud)
  }

  /**
   * Process static configuration
   */
  @bind
  public async staticConfig(
    description: Record<string, any>,
  ): Promise<unknown> {
    this.bud.log(`processing as static configuration:`, description.name)

    return await Promise.all(
      Object.entries(description.module).map(async ([key, value]) => {
        const request = this.bud[key]
        if (isFunction(request)) await request(value)
      }),
    )
  }
}

export default Configuration
