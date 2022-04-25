// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * The `bud-entrypoints` package provides {@link BudEntrypointsPlugin}, an adapter
 * for {@link @roots/entrypoints-webpack-plugin# | @roots/entrypoints-webpack-plugin}.
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import BudEntrypoints from './entrypoints.extension'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-entrypoints': BudEntrypoints
  }
}

export default BudEntrypoints
