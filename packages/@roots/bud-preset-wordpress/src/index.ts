import '@roots/bud-api'

import type {Module} from '@roots/bud-framework'
import * as Recommended from '@roots/bud-preset-recommend'
import * as React from '@roots/bud-react'
import * as WordPressDependencies from '@roots/bud-wordpress-dependencies'
import * as WordPressExternals from '@roots/bud-wordpress-externals'
import * as WordPressManifests from '@roots/bud-wordpress-manifests'

declare module '@roots/bud-framework' {
  interface Extensions {
    '@roots/bud-preset-wordpress'?: Module
  }
}

const extension: Module = {
  name: '@roots/bud-preset-wordpress',
  register: app => {
    app.use([
      Recommended,
      React,
      WordPressDependencies,
      WordPressExternals,
      WordPressManifests,
    ])
  },
}

export const {name, register} = extension
