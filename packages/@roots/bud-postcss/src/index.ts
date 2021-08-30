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
  interface Framework {
    /**
     * Configure postcss plugins and plugin options.
     */
    postcss: PostCssConfig
  }

  namespace Framework {
    interface Extensions {
      '@roots/bud-postcss': BudPostCssExtension
    }

    interface Loaders {
      postcss: Loader
    }

    interface Items {
      postcss: Item
    }
  }
}

import type {Item, Loader} from '@roots/bud-build'

import {BudPostCssExtension} from './BudPostCssExtension'
import {PostCssConfig} from './PostCssConfig'

export const {name, api, boot} = BudPostCssExtension
export {PostCssConfig}
export type {BudPostCssExtension}
