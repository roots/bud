// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * The `bud-entrypoints` package provides {@link BudEntrypointsPlugin}, an adapter
 * for {@link @roots/entrypoints-webpack-plugin# | @roots/entrypoints-webpack-plugin}.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation @betaDocumentation
 */

import {BudEntrypointsPlugin} from './BudEntrypointsPlugin'

declare module '@roots/bud-framework' {
  /**
   * {@inheritDoc @roots/bud-framework#Plugins}
   *
   * @override
   */
  interface Plugins {
    /**
     * Adapter for {@link @roots/entrypoints-webpack-plugin# | @roots/entrypoints-webpack-plugin}.
     *
     * @see {@link BudEntrypointsPlugin}
     *
     * @public
     */
    '@roots/bud-entrypoints': BudEntrypointsPlugin
  }
}

export const {name, make} = BudEntrypointsPlugin
