/// <reference types="@roots/bud-postcss" />

import type {Item, Loader, Rule} from '@roots/bud-build'

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
    resolveUrl: Loader
    'sass-loader': Loader
  }

  interface Items {
    resolveUrl: Item
    sass: Item
  }

  interface Rules {
    sass: Rule
  }
}
