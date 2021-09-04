/**
 * ⚡️ Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * - 💁 Composable - Build boss web applications with a modular, hackable build system
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 * - 🌱 Easy - Low bundle size and fast build times with little to no configuration
 *
 * @remarks
 * `@roots/bud-tailwindcss` adds [tailwindcss](https://tailwindcss.com/') to [@roots/bud](https://github.com/roots/bud)
 *
 * @export {name} The extension name
 * @export {api} The extension API
 * @export {boot} The extension boot function
 * @export {BudTailwindCssExtension} The extension interface
 *
 * @author Kelly Mears <kelly@roots.io>
 * @license MIT
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
import type {tailwindConfig} from './tailwindConfig'

export const {name, api, boot} = BudTailwindCssExtension
export type {BudTailwindCssExtension}
