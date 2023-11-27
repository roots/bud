import type {Bud} from '@roots/bud-framework'

import {bind} from '@roots/bud-support/decorators/bind'

/**
 * User config parser
 */
class DynamicConfiguration {
  /**
   * Class constructor
   */
  public constructor(public bud: Bud) {}

  /**
   * Process static configuration
   */
  @bind
  public async execute(config: (bud: Bud) => Promise<any>): Promise<void> {
    await config.call(this.bud, this.bud)
  }
}

export default DynamicConfiguration
