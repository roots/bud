// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * @roots/bud-esbuild
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

import type {Item, Loader, Rule} from '@roots/bud-build'
import BudEsbuild from '@roots/bud-esbuild/extension'

declare module '@roots/bud-framework' {
  interface Bud {
    esbuild: {
      enable: BudEsbuild[`enable`]
      get: BudEsbuild[`get`]
      getOptions: BudEsbuild[`getOptions`]
      set: BudEsbuild[`set`]
      setOptions: BudEsbuild[`setOptions`]
      use: BudEsbuild[`use`]
    }
  }

  interface Modules {
    '@roots/bud-esbuild': Bud[`esbuild`]
  }

  interface Loaders {
    esbuild: Loader
  }

  interface Items {
    'esbuild-js': Item
    'esbuild-ts': Item
  }

  interface Rules {
    js: Rule
    ts: Rule
  }
}

export {BudEsbuild as default}
