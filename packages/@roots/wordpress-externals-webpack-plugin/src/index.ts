// Copyright (c) Roots Foundation, LLC. All rights reserved. Licensed under the MIT license.

/**
 * The {@link @roots/wordpress-externals-webpack-plugin# | @roots/wordpress-externals-webpack-plugin} externalizes
 * dependencies which should be enqueue through WordPress' API
 *
 * @see https://github.com/roots/bud/tree/stable/packages/wordpress-externals-webpack-plugin
 *
 * @packageDocumentation @betaDocumentation
 */

import {Compiler, ExternalsPlugin} from 'webpack'

import {externals} from './externals'

export class Plugin {
  public name = 'WordPressExternalsWebpackPlugin'

  public stage = Infinity

  public externals: ExternalsPlugin

  public constructor() {
    this.externals = new ExternalsPlugin('window', externals)
  }

  public apply(compiler: Compiler): void {
    this.externals.apply(compiler)
  }
}
