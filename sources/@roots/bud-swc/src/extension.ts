import type {Bud} from '@roots/bud-framework/bud'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'

/**
 * Transpile JS and TS with `swc-loader`
 *
 * @public
 * @decorator `@label`
 * @decorator `@options`
 */
@label('@roots/bud-swc')
@options({parseMap: false})
export default class BudSWC extends Extension {
  /**
   * `register` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register() {
    this.app.hooks
      .on('build.resolve.extensions', ext => ext.add('.ts').add('.tsx'))
      .tapAsync(this.registerSWC)
  }

  /**
   * Register SWC with the build service
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async registerSWC(bud: Bud) {
    bud.build
      .setLoader('swc', await this.resolve('swc-loader'))
      .setItem('swc', {
        loader: 'swc',
        options: this.options,
      })
      .setRule('ts', {
        test: ({hooks}) => hooks.filter('pattern.ts'),
        include: [({path}) => path('@src')],
        use: ['swc'],
      })
      .rules.js.setUse(['swc'])
  }
}
