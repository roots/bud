/// <reference path="../../bud/lib/index.d.ts" />
/// <reference path="../../bud-framework/lib/index.d.ts" />

import type {Item, Loader, Rule} from '@roots/bud-framework'

import type Esbuild from './extension.js'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-esbuild': Esbuild
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
