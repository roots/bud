import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  label,
} from '@roots/bud-framework/extension/decorators'

/**
 * Solid configuration
 */
@label(`@roots/bud-solid`)
@dependsOn([`@roots/bud-babel`])
export default class BudSolid extends Extension {
  /**
   * {@link Extension.boot}
   */
  @bind
  public override async boot(bud: Bud) {
    bud.babel.setPreset(
      `babel-preset-solid`,
      await this.resolve(`babel-preset-solid`),
    )
  }
}
