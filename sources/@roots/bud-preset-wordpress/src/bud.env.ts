import '@roots/bud-babel'
import '@roots/bud-postcss'
import '@roots/bud-react'
import '@roots/bud-wordpress-dependencies'
import '@roots/bud-wordpress-externals'
import '@roots/bud-wordpress-manifests'

import {BudWordPressPreset} from './'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-preset-wordpress': BudWordPressPreset
  }
}
