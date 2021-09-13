// Copyright (c) Roots Foundation, LLC. All rights reserved. Licensed under the MIT license.

/**
 * Adds TypeScript support to Bud
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * - 💁 Composable - Build exceptional web applications using a modular, hackable build system
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 * - 🌱 Easy - Low bundle size and fast build times with little to no configuration
 *
 * @remarks
 * You should absolutely use this extension
 *
 * @extension @packageDocumentation @betaDocumentation
 */

import {Item, Loader, Rule} from '@roots/bud-build'
import {Extension} from '@roots/bud-framework'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

import {typecheck} from './api'
import {BudTypeScriptExtension} from './BudTypeScriptExtension'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * Enable typescript type checking
     *
     * @example
     * ```js
     * bud.typecheck()
     * ```
     *
     * @public
     */
    typecheck: typecheck
  }

  interface Modules {
    '@roots/bud-typescript': Extension.Module
  }

  interface Plugins {
    'fork-ts-checker-plugin': Extension.CompilerPlugin<
      typeof ForkTsCheckerWebpackPlugin
    >
  }

  interface Loaders {
    ts: Loader
  }

  interface Items {
    ts: Item
  }

  interface Rules {
    ts: Rule
  }
}

export const {name, boot, api} = BudTypeScriptExtension
