/// <reference types="@roots/bud-build" />

import type {Build} from '@roots/bud-framework/services'

import type {BudSass} from './extension.js'
import type {BudResolveUrl} from './resolve-url/extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    sass: {
      get: BudSass[`get`]
      getOptions: BudSass[`getOptions`]
      set: BudSass[`set`]
      setOptions: BudSass[`setOptions`]
      importGlobal: BudSass[`importGlobal`]
      registerGlobal: BudSass[`registerGlobal`]
    }
  }
  interface Modules {
    '@roots/bud-sass': Bud[`sass`]
    '@roots/bud-sass/resolve-url': BudResolveUrl
  }

  interface Loaders {
    resolveUrl: Build.Loader
    'sass-loader': Build.Loader
  }

  interface Items {
    resolveUrl: Build.Item
    sass: Build.Item
  }

  interface Rules {
    sass: Build.Rule
  }
}
