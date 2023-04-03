import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  development,
  label,
} from '@roots/bud-framework/extension/decorators'

/**
 * Register `react-refresh-typescript` transform with TSC compiler
 */
@label(`@roots/bud-react/babel-refresh`)
@development
export default class BudBabelRefresh extends Extension {
  /**
   * {@link Extension.register}
   */
  @bind
  public override async register(bud: Bud) {
    this.logger.log(`Registering react-refresh-babel transformer`)

    bud.babel.setPlugin(
      `react-refresh/babel`,
      await this.resolve(`react-refresh/babel`, import.meta.url),
    )
  }
}
