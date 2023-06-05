/// <reference types="@roots/bud-build" />

import type {Build} from '@roots/bud-framework/services'

import type {BudSass, BudSassApi} from './extension.js'
import type {BudResolveUrl} from './resolve-url/extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    sass: BudSassApi
  }

  interface Modules {
    '@roots/bud-sass': BudSass
    '@roots/bud-sass/resolve-url': BudResolveUrl
  }

  interface Loaders {
    'resolve-url': Build.Loader
    sass: Build.Loader
  }

  interface Items {
    'resolve-url': Build.Item
    sass: Build.Item
  }

  interface Rules {
    sass: Build.Rule
  }
}

declare module '@roots/bud' {
  interface Bud {
    sass: BudSassApi
  }

  interface Modules {
    '@roots/bud-sass': BudSass
    '@roots/bud-sass/resolve-url': BudResolveUrl
  }

  interface Loaders {
    'resolve-url': Build.Loader
    sass: Build.Loader
  }

  interface Items {
    'resolve-url': Build.Item
    sass: Build.Item
  }

  interface Rules {
    sass: Build.Rule
  }
}
