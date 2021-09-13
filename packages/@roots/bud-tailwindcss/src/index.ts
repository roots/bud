// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * Adds tailwindcss support to Bud
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * - 💁 Composable - Build exceptional web applications using a modular, hackable build system
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 * - 🌱 Easy - Low bundle size and fast build times with little to no configuration
 *
 * @extension @packageDocumentation @betaDocumentation
 */

declare module '@roots/bud-framework' {
  interface Framework {
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
     * @public @config
     */
    tailwind: tailwindConfig
  }

  /**
   * {@inheritDoc @roots/bud-framework#Modules}
   * @public @override
   */
  interface Modules {
    '@roots/bud-tailwindcss': BudTailwindCssExtension
  }
}

import {BudTailwindCssExtension} from './BudTailwindCssExtension'
import type {tailwindConfig} from './tailwindConfig'

export const {name, api, boot} = BudTailwindCssExtension
export type {BudTailwindCssExtension}
