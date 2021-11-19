/**
 * Preset config for WordPress plugins & themes.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * - 💁 Composable - Build boss web applications with a modular, configurable build system
 *
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 *
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @remarks
 * This preset is a wrapper for the following presets:
 *
 * - {@link @roots/bud-preset-recommend# | @roots/bud-preset-recommend}
 *
 * - {@link @roots/bud-react# | @roots/bud-react}
 *
 * - {@link @roots/bud-wordpress-dependencies# | @roots/bud-wordpress-dependencies}
 *
 * - {@link @roots/bud-wordpress-externals# | @roots/bud-wordpress-externals}
 *
 * - {@link @roots/bud-wordpress-manifests# | @roots/bud-wordpress-manifests}
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
 * @remarks
 * - 💁 Composable - Build exceptional applications with a modular, configurable build system
 *
 * - 💪 Modern - Modern framework written in TypeScript with an expressive API
 *
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @extension @packageDocumentation @betaDocumentation
 */

import type {Extension} from '@roots/bud-framework'
import type {Framework} from '@roots/bud-framework'

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
declare interface BudWordPressPreset extends Extension.Module {
  name: '@roots/bud-preset-wordpress'
  register: (app: Framework) => void
}

declare const name_2: BudWordPressPreset['name']
export {name_2 as name}

export declare const register: BudWordPressPreset['register']

export {}
