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

interface BudPresetRecommended extends Module {}

const BudPresetRecommended: BudPresetRecommended = {
  name: '@roots/bud-preset-recommend',

  register: app => {
    app.use([babel, BudPostCssExtension, entrypoints])
  },
}

export const {name, register} = BudPresetRecommended
export type {BudPresetRecommended}
