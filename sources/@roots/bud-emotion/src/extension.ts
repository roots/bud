import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOnOptional,
  label,
} from '@roots/bud-framework/extension/decorators'
import {isUndefined} from '@roots/bud-support/lodash-es'

/**
 * Emotion extension
 *
 * @public
 * @decorator `@label`
 * @decorator `@dependsOnOptional`
 */
@label(`@roots/bud-emotion`)
@dependsOnOptional([`@roots/bud-babel`, `@roots/bud-swc`])
export default class BudEmotion extends Extension {
  /**
   * `afterConfig` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async afterConfig() {
    if (!isUndefined(this.app.babel))
      this.app.babel.setPlugin(`@emotion/babel-plugin`)

    if (!isUndefined(this.app.swc))
      this.app.swc.plugins(plugins => {
        plugins.push([`emotion-swc-plugin`, {}])
        return plugins
      })
  }
}
