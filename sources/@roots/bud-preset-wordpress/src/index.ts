// Copyright (c) Roots Foundation, LLC. All rights reserved.
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
 * The manifest plugin suite is only enqueued in production mode:
 * - `@roots/bud-wordpress-dependencies`
 * - `@roots/bud-wordpress-externals`
 * - `@roots/bud-wordpress-manifests`
 *
 * @public
 */
interface BudWordPressPreset extends Extension.Module {
  name: '@roots/bud-preset-wordpress'
  register(app: Framework): Promise<void>
}

export const name: BudWordPressPreset['name'] =
  '@roots/bud-preset-wordpress'

export const register: BudWordPressPreset['register'] = async app => {
  if (!app.isProduction) return

  try {
    const extensions = await Promise.all([
      await import('@roots/bud-wordpress-externals'),
      await import('@roots/bud-wordpress-manifests'),
      await import('@roots/bud-wordpress-dependencies'),
    ])

    await Promise.all(extensions.map(app.extensions.add))
  } catch (err) {
    app.error(err)
  }
}
