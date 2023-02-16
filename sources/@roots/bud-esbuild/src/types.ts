/* eslint-disable n/no-unpublished-import */

/// <reference types="@roots/bud" />
/// <reference types="@roots/bud-framework" />

import type {Item} from '@roots/bud-build/item'
import type {Loader} from '@roots/bud-build/loader'
import type {Rule} from '@roots/bud-build/rule'

import type Esbuild from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    esbuild: {
      set: Esbuild[`set`]
      get: Esbuild[`get`]
      getOptions: Esbuild[`getOptions`]
      setOptions: Esbuild[`setOptions`]
      enable: Esbuild[`enable`]
      use: Esbuild[`use`]
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
