/* eslint-disable n/no-unpublished-import */

/// <reference types="@roots/bud" />
/// <reference types="@roots/bud-framework" />

import type {Item} from '@roots/bud-build/item'
import type {Loader} from '@roots/bud-build/loader'
import type {Rule} from '@roots/bud-build/rule'

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
