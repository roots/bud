// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Preset config for WordPress plugins & themes.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import type {Extension, Framework} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-preset-wordpress': BudWordPressPreset
  }
}

/**
 * Preset config for WordPress plugins & themes
 *
 * @remarks
 * This preset is a wrapper for the following presets:
 * - `@roots/bud-preset-recommend`
 * - `@roots/bud-react`
 * - `@roots/bud-wordpress-dependencies`
 * - `@roots/bud-wordpress-externals`
 * - `@roots/bud-wordpress-manifests`
 *
 * @public
 */
type BudWordPressPreset = Extension.Module

export const name: BudWordPressPreset['name'] =
  '@roots/bud-preset-wordpress'

export const boot = async (app: Framework) => {
  app.hooks.on(
    'middleware.proxy.replacements',
    (replacements): Array<[string, string]> => {
      const proxy = app.hooks.filter('middleware.proxy.target').origin
      const dev = app.server.connection.url.origin

      return [
        ...(replacements ?? []),
        [
          `<link id="wp-admin-canonical" rel="canonical" href="${proxy}`,
          `<link id="wp-admin-canonical" rel="canonical" href="${dev}`,
        ],
        [
          `<form name="loginform" id="loginform" action="${proxy}`,
          `<form name="loginform" id="loginform" action="${dev}`,
        ],
      ]
    },
  )
}

export * as ThemeJSON from './theme'
