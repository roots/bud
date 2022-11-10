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
export class BudEmotion extends Extension {
  /**
   * `configAfter` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async configAfter() {
    if (!isUndefined(this.app.babel))
      this.app.babel.setPlugin(`@emotion/babel-plugin`)

    if (!isUndefined(this.app.swc)) {
      const plugin: [string, Record<string, any>] = [
        `@swc/plugin-emotion`,
        {},
      ]

      this.app.swc.plugins(plugins => {
        plugins?.push(plugin)
        return plugins ?? [plugin]
      })
    }
  }
}
