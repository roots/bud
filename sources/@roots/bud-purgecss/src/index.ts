// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Adds purgecss support to Bud
 *
 * @example
 * ```ts
 * app.purge({
 *  content: [app.path('resources/views/**')],
 *  allow: require('purgecss-with-wordpress').whitelist,
 *  allowPatterns: require('purgecss-with-wordpress').whitelistPatterns,
 * })
 * ```
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import '@roots/bud-postcss'

import type {Extension} from '@roots/bud-framework'

import * as purge from './purge.interface.js'

declare module '@roots/bud-framework' {
  interface Bud {
    purgecss: purge.api
  }

  interface Modules {
    '@roots/bud-purgecss': Extension
  }
}

export * from './extension.js'
