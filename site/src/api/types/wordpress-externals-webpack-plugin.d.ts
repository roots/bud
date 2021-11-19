/**
 * The {@link @roots/wordpress-externals-webpack-plugin# | @roots/wordpress-externals-webpack-plugin} externalizes
 * dependencies which should be enqueue through WordPress' API
 *
 * @see https://github.com/roots/bud/tree/stable/packages/wordpress-externals-webpack-plugin
 *
 * @packageDocumentation @betaDocumentation
 */

import {Compiler} from 'webpack'
import {ExternalsPlugin} from 'webpack'

export declare class WordPressExternals {
  name: string
  stage: number
  externals: ExternalsPlugin
  constructor()
  apply(compiler: Compiler): void
}

export {}
