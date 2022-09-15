import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  label,
} from '@roots/bud-framework/extension/decorators'

/**
 * Emotion extension
 *
 * @public
 * @decorator `@label`
 * @decorator `@dependsOnOptional`
 */
@label(`@roots/bud-emotion`)
@dependsOn([`@roots/bud-babel`])
export default class BudEmotion extends Extension {
  /**
   * `buildBefore` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async buildBefore() {
    this.app.babel.setPlugin(`@emotion/babel-plugin`)
  }
}
