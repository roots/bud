// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Adds TypeScript support to Bud
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @remarks
 * You should absolutely use this extension
 *
 * @packageDocumentation
 */

import type {Module} from '@roots/bud-framework/types/extension/module'
import type * as Build from '@roots/bud-framework/types/services/build'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

import {BudTypeScriptExtension} from './bud.extension'
import {facade} from './bud.typecheck'

declare module '@roots/bud-framework' {
  interface Bud {
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
    'fork-ts-checker-plugin': Module<
      any,
      typeof ForkTsCheckerWebpackPlugin
    >
  }

  interface Loaders {
    ts: Build.Loader
  }

  interface Items {
    ts: Build.Item
  }

  interface Rules {
    ts: Build.Rule
  }
}

export const {label, register, boot, options} = BudTypeScriptExtension
