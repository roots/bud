/**
 * ⚡️ Lightning fast frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @remarks
 * Adds support for PostCSS.
 *
 * @packageDocumentation
 */

import {Item, Loader} from '@roots/bud-build'

import {BudPostCssExtension} from './BudPostCssExtension'
import {PostCssConfig} from './PostCssConfig'

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

export const {name, api, boot} = BudPostCssExtension

export {PostCssConfig}
export {BudPostCssExtension}
