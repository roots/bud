import type {Framework} from '@roots/bud-framework'
import tailwindcss from 'tailwindcss'
import {TailwindConfig} from 'tailwindcss/tailwind-config'

export interface tailwindConfig {
  (this: Framework, config?: TailwindConfig): Framework
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
export function tailwindConfig(
  this: Framework,
  config?: TailwindConfig,
): Framework {
  this.postcss.setPlugins({
    'postcss-import': this.postcss.plugins['postcss-import'],
    tailwindcss: [
      tailwindcss,
      config ?? this.path('project', 'tailwind.config.js'),
    ],
    'postcss-nested': this.postcss.plugins['postcss-nested'],
    'postcss-preset-env':
      this.postcss.plugins['postcss-preset-env'],
  })

  return this
}
