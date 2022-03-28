import type {Extension, Framework} from '@roots/bud-framework'

/**
 * Add TailwindCSS support to Bud
 *
 * @public
 */
export interface BudTailwindCssExtension extends Extension.Module {
  label: '@roots/bud-tailwindcss'
  boot: (app: Framework) => Promise<void>
}

export class BudTailwindCssExtension implements BudTailwindCssExtension {
  /**
   * Extension name
   *
   * @public
   */
  public static label = '@roots/bud-tailwindcss'

  /**
   * Extension boot
   *
   * @param app - Framework
   * @returns void
   */
  public static async boot(app: Framework, logger: Console) {
    try {
      const {default: tailwindcss} = await import('tailwindcss')
      const {default: nesting} = await import('tailwindcss/nesting')

      app.postcss.setPlugins({
        'postcss-import': app.postcss.get('postcss-import'),
        'tailwindcss-nesting': [nesting],
        tailwindcss: [tailwindcss],
        'postcss-preset-env': app.postcss.get('postcss-preset-env'),
      })

      logger.log('postcss has been configured for tailwindcss')
    } catch (message) {
      logger.warn({message})
    }
  }
}
