/**
 * ⚡️ Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @see https://roots.io/bud
 *
 * @remarks
 * - 💁 Composable - Build boss web applications with a modular, hackable build system
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 * - 🌱 Easy - Low bundle size and fast build times with little to no configuration
 *
 * @packageDocumentation
 */

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/bud-preset-recommend': BudPresetRecommended
    }
  }
}

import * as babel from '@roots/bud-babel'
import * as entrypoints from '@roots/bud-entrypoints'
import type {Module} from '@roots/bud-framework'
import * as BudPostCssExtension from '@roots/bud-postcss'

/**
 * Recommended preset configuration for Bud.
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
interface BudPresetRecommended extends Module {}

const BudPresetRecommended: BudPresetRecommended = {
  name: '@roots/bud-preset-recommend',

  register: app => {
    app.use([babel, BudPostCssExtension, entrypoints])
  },
}

export const {name, register} = BudPresetRecommended
export type {BudPresetRecommended}
