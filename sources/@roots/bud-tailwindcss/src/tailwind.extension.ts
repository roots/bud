import {Extension} from '@roots/bud-framework'
import {
  bind,
  dependsOn,
  label,
} from '@roots/bud-framework/extension/decorators'

@label('@roots/bud-tailwindcss')
@dependsOn(['@roots/bud-postcss'])
class BudTailwindCss extends Extension {
  @bind
  public async boot() {
    try {
      const {default: tailwindcss} = await this.import('tailwindcss')
      const {default: nesting} = await this.import('tailwindcss/nesting')

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

export default BudTailwindCss
