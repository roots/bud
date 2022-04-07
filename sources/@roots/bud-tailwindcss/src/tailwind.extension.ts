import type {Bud, Extension} from '@roots/bud-framework'
import type {Signale} from '@roots/bud-support'

/**
 * Add TailwindCSS support to Bud
 *
 * @public
 */
export interface BudTailwindCssExtension extends Extension.Module {
  label: '@roots/bud-tailwindcss'
  boot: (app: Bud) => Promise<void>
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
   * @param app - Bud
   * @returns void
   */
  public static async boot(app: Bud, logger: Signale) {
    try {
      const {default: tailwindcss} = await import('tailwindcss')
      const {default: nesting} = await import('tailwindcss/nesting')

      app.postcss.setPlugins({
        'postcss-import': app.postcss.get('postcss-import'),
        'tailwindcss-nesting': [nesting],
        tailwindcss: [tailwindcss],
        'postcss-preset-env': app.postcss.get('postcss-preset-env'),
      })

      logger.success('postcss has been configured for tailwindcss')
    } catch (message) {
      logger.warn({message})
    }
  }
}
