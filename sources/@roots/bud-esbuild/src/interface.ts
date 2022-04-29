import {Build} from '@roots/bud-framework'

import Esbuild from './'

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
    ts: Build.Rule
  }
}
