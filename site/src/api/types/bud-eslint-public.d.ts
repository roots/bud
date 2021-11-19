/**
 * The `bud-entrypoints` package provides {@link BudEntrypointsPlugin}, an adapter
 * for `@roots/entrypoints-webpack-plugin`.
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

import {Container} from '@roots/container'
import EslintPlugin from 'eslint-webpack-plugin'
import {Extension} from '@roots/bud-framework'
import {Framework} from '@roots/bud-framework'
import {Maybe} from '@roots/bud-framework'
import {Options} from 'eslint-webpack-plugin/declarations/options'

export declare const make: Maybe<
  [Container<Options>, Framework],
  EslintPlugin & Extension.ApplyPlugin
>

declare const name_2: string
export {name_2 as name}

export declare const options: Maybe<[Framework], Options>

export {}
