import {Extension} from '@roots/bud-framework'
import {
  bind,
  dependsOn,
  label,
} from '@roots/bud-framework/extension/decorators'

@label('@roots/bud-emotion')
@dependsOn(['@roots/bud-babel', '@roots/bud-react'])
class BudEmotion extends Extension {
  @bind
  public async boot() {
    this.app.babel.setPlugins &&
      this.app.babel.setPlugin(
        '@emotion/babel-plugin',
        this.resolve('@emotion/babel-plugin'),
      )
  }
}

export default BudEmotion
