import {Extension} from '@roots/bud-framework'
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
 * @decorator `@dependsOn`
 */
@label('@roots/bud-emotion')
@dependsOn(['@roots/bud-babel', '@roots/bud-react'])
export default class BudEmotion extends Extension {
  @bind
  public async boot() {
    const plugin = await this.resolve('@emotion/babel-plugin')
    this.app.babel.setPlugin('@emotion/babel-plugin', plugin)
  }
}
