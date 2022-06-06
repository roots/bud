import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  label,
} from '@roots/bud-framework/extension/decorators'

@label('@roots/bud-solid')
@dependsOn(['@roots/bud-babel'])
export default class BudSolid extends Extension {
  @bind
  public async boot() {
    const preset = await this.resolve('babel-preset-solid')
    this.app.babel.setPreset('babel-preset-solid', preset)
  }
}
