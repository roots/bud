// Copyright (c) Roots Foundation, LLC. All rights reserved.
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

import {facade} from './api'
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
    typecheck: facade
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

export const {name, boot, options, api} = BudTypeScriptExtension
