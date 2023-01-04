import {bind} from '@roots/bud-support/decorators'
import isFunction from '@roots/bud-support/lodash/isFunction'

import type {Bud} from '../bud.js'

/**
 * User config parser
 * @public
 */
class Configuration {
  /**
   * Class constructor
   * @public
   */
  public constructor(public app: Bud) {}

  /**
   * Process configuration
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async run(description: any): Promise<unknown> {
    if (description.dynamic) {
      this.app.log(
        `processing as dynamic configuration:`,
        description.name,
      )

      const configCallable =
        description.module?.default ?? description.module
      await configCallable(this.app)
    } else {
      this.app.log(`processing as static configuration:`, description.name)

      return await this.processStaticConfiguration(description)
    }
  }

  /**
   * Process static configuration
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async processStaticConfiguration(
    description: Record<string, any>,
  ): Promise<unknown> {
    this.app.info(
      `${description.name} is being processed as a static config`,
    )

    return await Promise.all(
      Object.entries(description.module).map(async ([key, value]) => {
        const request = this.app[key]
        if (isFunction(request)) await request(value)
      }),
    )
  }
}

export default Configuration
