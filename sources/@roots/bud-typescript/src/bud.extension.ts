import {Extension} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'

import {typecheck} from './bud.typecheck'

/**
 * @public
 */
export class TypeScript extends Extension.Extension {
  /**
   * @public
   */
  public label = '@roots/bud-typescript'

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register() {
    this.app.api.bindFacade('typecheck', typecheck)
  }

  /**
   * @public
   * @decorator `@bind`
   */
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
