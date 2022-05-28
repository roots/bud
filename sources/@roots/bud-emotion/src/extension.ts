import {Extension} from '@roots/bud-framework'
import {
  bind,
  dependsOn,
  dependsOnOptional,
  label,
} from '@roots/bud-framework/extension/decorators'

/**
 * Emotion support to `@roots/bud`
 *
 * @public
 * @decorator `@label`
 * @decorator `@dependsOn`
 * @decorator `@dependsOnOptional`
 */
@label('@roots/bud-emotion')
@dependsOn(['@roots/bud-babel'])
@dependsOnOptional(['@roots/bud-react'])
export default class BudEmotion extends Extension {
  /**
   * `beforeBuild` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async beforeBuild() {
    this.app.babel?.setPlugins &&
      this.app.babel.setPlugin(
        '@emotion/babel-plugin',
        this.resolve('@emotion/babel-plugin'),
      )
  }

  /**
   * `when` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async when() {
    return true
  }
}
