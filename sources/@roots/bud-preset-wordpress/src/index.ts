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
  app.when(app.env.has('WP_HOME'), () => {
    /**
     * Set proxy URL
     */
    app.proxy(app.env.get('WP_HOME'))

    /**
     * Intercept URL
     */
    app.hooks.action('event.proxy.interceptor', async ({hooks}) =>
      hooks.on(
        'middleware.proxy.replacements',
        (replacements): Array<[string, string]> => [
          ...(replacements ?? []),
          [app.env.get('WP_HOME').concat('/'), '/'],
        ],
      ),
    )
  })

  app.when(app.env.has('WP_SITE_URL'), ({hooks}) => {
    hooks.action('event.proxy.interceptor', async ({hooks}) => {
      hooks.on(
        'middleware.proxy.replacements',
        (replacements): Array<[string, string]> => [
          ...(replacements ?? []),
          [
            app.env.get('WP_SITEURL'),
            app.env.get('WP_SITEURL').replace(app.env.get('WP_HOME'), ''),
          ],
        ],
      )
    })
  })
}

export * as ThemeJSON from './theme'
