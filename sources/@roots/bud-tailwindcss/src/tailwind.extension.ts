import { Extension } from '@roots/bud-framework'

export class BudTailwindCss extends Extension.Extension {
  /**
   * @public
   */
  public label = '@roots/bud-tailwindcss'

  /**
   * @public
   */
  public async boot() {
    try {
      const {default: tailwindcss} = await import('tailwindcss')
      const {default: nesting} = await import('tailwindcss/nesting')

      this.app.postcss.setPlugins({
        'postcss-import': this.app.postcss.get('postcss-import'),
        'tailwindcss-nesting': [nesting],
        tailwindcss: [tailwindcss],
        'postcss-preset-env': this.app.postcss.get('postcss-preset-env'),
      })

      this.logger.success('postcss configured for tailwindcss')
    } catch (message) {
      this.logger.warn(message)
    }
  }
}
