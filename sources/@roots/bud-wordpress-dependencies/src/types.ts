/// <reference path="../../bud/lib/index.d.ts" />

import type Extension from './extension.js'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-wordpress-dependencies': Extension
  }
}
