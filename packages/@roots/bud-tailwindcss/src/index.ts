/**
 * Add TailwindCss to Bud projects
 *
 * @remarks
 * 💁 Composable - Build boss web applications with a modular, hackable build system
 * 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 * 🌱 Easy - Low bundle size and fast build times with little to no configuration
 *
 * @see https://roots.io/bud
 *
 * @packageDocumentation
 */

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

import {BudTailwindCssExtension} from './BudTailwindCssExtension'
import {tailwindConfig} from './tailwindConfig'

export const {name, api, boot} = BudTailwindCssExtension
export {tailwindConfig}
export type {BudTailwindCssExtension}
