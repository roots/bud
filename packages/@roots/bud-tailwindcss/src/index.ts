import {BudTailwindCssExtension} from './BudTailwindCssExtension'
import {tailwindConfig} from './tailwindConfig'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * Configure tailwindcss.
     *
     * @usage
     * ```js
     * bud.tailwind('tailwind.config.js')
     * ```
     *
     * ```js
     * bud.tailwind({
     *   theme: {
     *     // etc
     *   }
     * })
     * ```
     */
    tailwind: tailwindConfig
  }

  namespace Framework {
    interface Extensions {
      '@roots/bud-tailwindcss': BudTailwindCssExtension
    }
  }
}

export const {name, api, boot} = BudTailwindCssExtension
export {tailwindConfig}
