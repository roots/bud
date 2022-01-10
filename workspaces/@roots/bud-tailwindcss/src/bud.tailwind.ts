import type {Framework} from '@roots/bud-framework'
import type {TailwindConfig} from 'tailwindcss/tailwind-config'

export interface tailwind {
  (config?: TailwindConfig): Framework
}

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
export const tailwind: tailwind = function (config?) {
  this as Framework

  try {
    this.postcss.setPluginOption('tailwindcss', config)
    return this
  } catch (error) {
    this.error(error)
    return this
  }
}
