import type {Framework} from '@roots/bud-framework'
import tailwindcss from 'tailwindcss'
import {TailwindConfig} from 'tailwindcss/tailwind-config'

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
export function tailwind(config?: TailwindConfig): Framework {
  const ctx = this as Framework

  const postcssPlugin =
    config ?? ctx.path('project', 'tailwindcss.config.js')

  ctx.info(
    `tailwindcss to be configured using`,
    ...(typeof postcssPlugin === 'string'
      ? [`config file at`, postcssPlugin]
      : [`config object`]),
  )

  ctx.postcss.plugins = {
    'postcss-import': ctx.postcss.plugins['postcss-import'],
    tailwindcss: [
      tailwindcss,
      config ?? ctx.path('project', 'tailwind.config.js'),
    ],
    'postcss-nested': ctx.postcss.plugins['postcss-nested'],
    'postcss-preset-env':
      ctx.postcss.plugins['postcss-preset-env'],
  }

  return ctx
}
