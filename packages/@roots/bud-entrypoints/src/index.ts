/**
 * The `bud-entrypoints` package provides {@link BudEntrypointsPlugin}, an adapter
 * for {@link @roots/entrypoints-webpack-plugin# | @roots/entrypoints-webpack-plugin}.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @extension @packageDocumentation @betaDocumentation
 */

import {BudEntrypointsPlugin} from './BudEntrypointsPlugin'

declare module '@roots/bud-framework' {
  interface Plugins {
    '@roots/bud-entrypoints': BudEntrypointsPlugin
  }
}

export const {name, make} = BudEntrypointsPlugin
