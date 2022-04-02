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
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import './bud.env'

import {purgecss} from './bud.purge'
import {Purge} from './purge.interface'

/**
 * Module name
 *
 * @public
 */
export const name: Purge['name'] = '@roots/bud-purgecss'

/**
 * Module api
 *
 * @public
 */
export const api: Purge['api'] = {purgecss}

/**
 * Module registration
 *
 * @public
 */
export const register: Purge['register'] = async app => {
  app.api.set('purgecss', purgecss.bind(app))
  // @ts-ignore
  app.api.bindFacade('purgecss')
}
