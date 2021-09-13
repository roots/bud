/**
 * @see https://roots.io/bud
 *
 * @packageDocumentation
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
