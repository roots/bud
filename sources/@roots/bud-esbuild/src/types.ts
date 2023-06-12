/* eslint-disable n/no-unpublished-import */

import type {Item, Loader, Rule} from '@roots/bud-build'

import type Esbuild from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    esbuild: {
      enable: Esbuild[`enable`]
      get: Esbuild[`get`]
      getOptions: Esbuild[`getOptions`]
      set: Esbuild[`set`]
      setOptions: Esbuild[`setOptions`]
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
