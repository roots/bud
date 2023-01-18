/// <reference types="@roots/bud" />

import type Extension from './extension.js'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-wordpress-dependencies': Extension
  }
}
