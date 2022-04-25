import {Extension} from '@roots/bud-framework'
import {
  bind,
  dependsOn,
  label,
} from '@roots/bud-framework/extension/decorators'

import {reactRefresh} from './react-refresh/reactRefresh'

@label('@roots/bud-react')
@dependsOn(['@roots/bud-babel'])
export default class BudReact extends Extension {
  @bind
  public async register() {
    this.app.api.bindFacade('reactRefresh', reactRefresh)
  }

  @bind
  public async boot() {
    this.app.babel.setPreset(
      '@babel/preset-react',
      this.resolve('@babel/preset-react'),
    )
  }
}
