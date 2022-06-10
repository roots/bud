import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  label,
} from '@roots/bud-framework/extension/decorators'

/**
 * TailwindCSS support for `@roots/bud`
 *
 * @public
 * @decorator `@label`
 * @decorator `@dependsOn`
 */
@label('@roots/bud-tailwindcss')
@dependsOn(['@roots/bud-postcss'])
export default class BudTailwindCss extends Extension {
  /**
   * `register` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register() {
    try {
      const tailwindcss = await this.resolve('tailwindcss')
      const nesting = await this.resolve('tailwindcss/nesting/index.js')

      this.app.postcss.setPlugins({
        'postcss-import': this.app.postcss.plugins.get('postcss-import'),
        'tailwindcss-nesting': [nesting],
        tailwindcss: [tailwindcss],
        'postcss-preset-env': this.app.postcss.plugins.get(
          'postcss-preset-env',
        ),
      })

      this.logger.success('postcss configured for tailwindcss')
    } catch (message) {
      this.logger.error(message)
    }
  }
}
