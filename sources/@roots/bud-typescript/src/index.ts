// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Adds TypeScript support to Bud
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * You should absolutely use this extension
 *
 * @packageDocumentation
 */

import {Item, Loader, Rule} from '@roots/bud-build'
import {Extension} from '@roots/bud-framework'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

import {BudTypeScriptExtension} from './bud.extension'
import {facade} from './bud.typecheck'

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
    typecheck: facade
  }

  interface Modules {
    '@roots/bud-typescript': BudTypeScriptExtension
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

export const {name, boot, options, api} = BudTypeScriptExtension
