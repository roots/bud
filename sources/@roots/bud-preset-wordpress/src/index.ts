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

import type {Extension} from '@roots/bud-framework'

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

export * as ThemeJSON from './theme'
