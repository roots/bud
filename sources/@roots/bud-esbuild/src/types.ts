import type {Build} from '@roots/bud-framework/services'

import type Esbuild from './extension.js'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-esbuild': Esbuild
  }

  interface Loaders {
    esbuild: Build.Loader
  }

  interface Items {
    'esbuild-js': Build.Item
    'esbuild-ts': Build.Item
  }

  interface Rules {
    js: Build.Rule
    ts: Build.Rule
  }
}
