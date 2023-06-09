/* eslint-disable n/no-unpublished-import */

import type {Item, Loader, Rule} from '@roots/bud-build'

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
