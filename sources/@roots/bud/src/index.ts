// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * bud.js
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

import type Api from '@roots/bud-api'
import type Build from '@roots/bud-build'
import type Cache from '@roots/bud-cache'
import type Compiler from '@roots/bud-compiler'
import type Dashboard from '@roots/bud-dashboard'
import type Entrypoints from '@roots/bud-entrypoints'
import type Extensions from '@roots/bud-extensions'
import type * as Framework from '@roots/bud-framework'
import type Hooks from '@roots/bud-hooks'
import type Minify from '@roots/bud-minify'
import type Server from '@roots/bud-server'

declare module '@roots/bud' {
  interface Bud extends Framework.Bud {
    api: Api
    build: Build
    cache: Cache
    compiler: Compiler
    dashboard: Dashboard
    extensions: Extensions
    hooks: Hooks
    server: Server
  }

  interface Modules {
    '@roots/bud-entrypoints': Entrypoints
    '@roots/bud-minify': Minify
  }
}

export * from '@roots/bud/factory'
export * from '@roots/bud/instance'

export {default as Bud} from '@roots/bud/bud'
