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

import './bud.env'

import {purgecss} from './bud.purge'

export const label = '@roots/bud-purgecss'

export const dependsOn = new Set(['@roots/bud-postcss'])

export const register = async (_options, app) => {
  app.api.bindFacade('purgecss', purgecss)
}
