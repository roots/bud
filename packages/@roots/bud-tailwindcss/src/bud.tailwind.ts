import type {Framework} from '@roots/bud-framework'

import * as Tailwind from './tailwind.interface'

/**
 * Configure tailwindcss.
 *
 * @example
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
 *
 * @public
 */
export const tailwind: Tailwind.ConfigFn = function (config?) {
  this as Framework

  try {
    this.postcss.setPluginOption('tailwindcss', config)
    return this
  } catch (error) {
    this.error(error)
    return this
  }
}
