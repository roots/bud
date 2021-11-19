/**
 * Adds terser minification support to Bud
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

import type {Extension} from '@roots/bud-framework'
import type {Framework} from '@roots/bud-framework'
import TerserPlugin from 'terser-webpack-plugin'
import type {TerserPluginOptions} from 'terser-webpack-plugin'

export declare const api: BudTerserPlugin['api']

export declare const boot: BudTerserPlugin['boot']

export declare interface BudTerserPlugin
  extends Extension.CompilerPlugin<
    TerserPlugin,
    TerserPluginOptions
  > {
  name: '@roots/bud-terser'
  api: {
    terser: terser
  }
}

declare const name_2: BudTerserPlugin['name']
export {name_2 as name}

export declare const options: BudTerserPlugin['options']

declare interface terser {
  (this: Framework, options: TerserPluginOptions): Framework
}

declare const terser: terser

export {}
