/**
 * Adds tailwindcss support to Bud
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * - 💁 Composable - Build exceptional web applications using a modular, hackable build system
 *
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 *
 * - 🌱 Easy - Low bundle size and fast build times with little to no configuration
 *
 * @extension @packageDocumentation @betaDocumentation
 */

import type {Extension} from '@roots/bud-framework'
import {Framework} from '@roots/bud-framework'
import {TailwindConfig} from 'tailwindcss/tailwind-config'

export declare const api: {
  tailwind: tailwindConfig
}

export declare const boot: (app: Framework) => void

export declare interface BudTailwindCssExtension
  extends Extension.Module {
  api: {
    tailwind: tailwindConfig
  }
  boot: (app: Framework) => void
}

export declare const BudTailwindCssExtension: BudTailwindCssExtension

declare const name_2: string
export {name_2 as name}

declare function tailwindConfig(
  this: Framework,
  config?: TailwindConfig,
): Framework

declare interface tailwindConfig {
  (this: Framework, config?: TailwindConfig): Framework
}

export {}
