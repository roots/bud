/**
 * ⚡️ Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @see https://roots.io/bud
 *
 * @remarks
 * - 💁 Composable - Build boss web applications with a modular, configurable build system
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @example
 * ```js
 * const wp = require('@roots/bud-preset-wordpress')
 *
 * module.exports = (app: Framework) => {
 *   app.use(wp)
 * }
 * ```
 *
 * @packageDocumentation
 */

import type {Framework, Module} from '@roots/bud-framework'
import * as BudRecommendPreset from '@roots/bud-preset-recommend'
import * as BudReactExtension from '@roots/bud-react'
import * as BudWordPressDependenciesExtension from '@roots/bud-wordpress-dependencies'
import * as BudWordPressExternalsExtension from '@roots/bud-wordpress-externals'
import * as BudWordPressManifestsExtension from '@roots/bud-wordpress-manifests'

declare module '@roots/bud-framework' {
  interface Extensions {
    '@roots/bud-preset-wordpress': BudWordPressPreset
  }
}

/**
 * Preset configuration for WordPress plugins & themes
 *
 * @remarks
 * This preset is a wrapper for the following presets:
 * - `@roots/bud-preset-recommend`
 * - `@roots/bud-react`
 * - `@roots/bud-wordpress-dependencies`
 * - `@roots/bud-wordpress-externals`
 * - `@roots/bud-wordpress-manifests`
 *
 * @prop {Module['name']} name - The preset name
 * @prop {Module['register']} register - The preset register function
 */
interface BudWordPressPreset extends Module {
  name: '@roots/bud-preset-wordpress'
  register: (app: Framework) => void
}

const name: BudWordPressPreset['name'] =
  '@roots/bud-preset-wordpress'

const register: BudWordPressPreset['register'] = app => {
  app.use([
    BudRecommendPreset,
    BudReactExtension,
    BudWordPressDependenciesExtension,
    BudWordPressExternalsExtension,
    BudWordPressManifestsExtension,
  ])
}

export {name, register}
