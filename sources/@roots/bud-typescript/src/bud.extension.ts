import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  label,
} from '@roots/bud-framework/extension/decorators'

import {typecheck} from './bud.typecheck'

@label('@roots/bud-typescript')
@dependsOn(['@roots/bud-babel'])
class BudTypeScript extends Extension {
  @bind
  public async register() {
    this.app.api.bindFacade('typecheck', typecheck)
  }

  @bind
  public async boot() {
    this.app.hooks.on('build.resolve.extensions', ext =>
      ext.add('.ts').add('.tsx'),
    )

    this.app.build
      .setLoader('ts', this.resolve('ts-loader'))
      .setItem('ts', {
        loader: 'ts',
        options: {
          compiler: this.resolve('typescript'),
          transpileOnly: true,
        },
      })
      .setRule('ts', {
        test: this.app.hooks.filter('pattern.ts'),
        include: [this.app.path('@src')],
        use: ['babel', 'ts'],
      })

    this.app.build.rules.js.setUse(['babel', 'ts'])
  }
}

export default BudTypeScript
