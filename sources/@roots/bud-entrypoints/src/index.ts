// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * The `bud-entrypoints` package provides {@link BudEntrypointsPlugin}, an adapter
 * for {@link @roots/entrypoints-webpack-plugin# | @roots/entrypoints-webpack-plugin}.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import {BudEntrypointsExtension} from './entrypoints.extension'

declare module '@roots/bud-framework' {
  interface Plugins {
    '@roots/bud-entrypoints': BudEntrypointsExtension
  }
}

export const {name, options, make} = BudEntrypointsExtension
