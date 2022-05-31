import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  label,
} from '@roots/bud-framework/extension/decorators'

/**
 * Sass support extension for `@roots/bud-sass`
 *
 * @public
 * @decorator `@label`
 * @decorator `@dependsOn`
 */
@label('@roots/bud-sass')
@dependsOn(['@roots/bud-postcss'])
export default class BudSass extends Extension {
  /**
   * Sass implementation
   *
   * @returns Sass
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async implementation() {
    try {
      const sass = await this.import('sass')

      this.logger.success('sass imported')

      return sass
    } catch (e) {
      this.logger.error(e)
      throw new Error(
        'sass not found. Install it with `yarn add sass --dev` or `npm i sass --save-dev`. This may be a problem with bud; please let us know what you experienced by filing an issue at https://github.com/roots/bud',
      )
    }
  }

  /**
   * Register extension
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register() {
    this.app.hooks.on('build.resolve.extensions', ext =>
      ext.add('.scss').add('.sass'),
    )

    const implementation = await this.implementation()
    const loader = await this.resolve('sass-loader')

    this.app.build
      .setLoader('sass', loader)
      .setItem('sass', {
        loader: 'sass',
        options: {
          implementation,
          sourceMap: true,
        },
      })
      .setRule('sass', {
        test: app => app.hooks.filter('pattern.sass'),
        include: [app => app.path('@src')],
        use: [`precss`, `css`, `postcss`, `resolveUrl`, `sass`],
      })

    if (this.app.postcss) this.app.postcss.syntax = 'postcss-scss'
  }
}
