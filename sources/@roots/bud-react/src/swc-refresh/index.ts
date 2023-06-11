import type {Bud} from '@roots/bud-framework'

import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  development,
  label,
} from '@roots/bud-framework/extension/decorators'

/**
 * Register `react-refresh-swc` transform with TSC compiler
 */
@label(`@roots/bud-react/swc-refresh`)
@development
export default class BudSWCRefresh extends Extension {
  /**
   * {@link Extension.buildBefore}
   */
  @bind
  public override async buildBefore(bud: Bud) {
    await this.registerTransform(bud)
  }

  /**
   * Register `react-refresh-swc` transform plugin
   */
  public async registerTransform({isDevelopment, swc}: Bud) {
    this.logger.log(`Registering swc react-refresh transformer`)

    swc.setTransform((transform = {}) => ({
      ...(transform ?? {}),
      react: {
        ...(transform?.react ?? {}),
        development: isDevelopment,
        refresh: isDevelopment,
      },
    }))
  }
}
