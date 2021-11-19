/**
 * Add stylelint support to Bud
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * - 💁 Composable - Build exceptional applications with a modular, configurable build system
 *
 * - 💪 Modern - Modern framework written in TypeScript with an expressive API
 *
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @extension @packageDocumentation @betaDocumentation
 */

import type {Container} from '@roots/container'
import type {Framework} from '@roots/bud-framework'
import {LinterOptions} from 'stylelint'
import {Options} from 'stylelint-webpack-plugin'
import {PluginOptions} from 'stylelint-webpack-plugin/declarations/options'
import StylelintWebpackPlugin from 'stylelint-webpack-plugin'

export declare const make: (
  options: Container<Options>,
) => StylelintWebpackPlugin

declare const name_2: 'stylelint-webpack-plugin'
export {name_2 as name}

export declare const options: (
  app: Framework,
) => Partial<PluginOptions & LinterOptions>

export {}
