import type {Build} from '@roots/bud-framework'

import {BudPostCssExtension} from './BudPostCssExtension'
import {PostCssConfig} from './PostCssConfig'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * Configure postcss.
     */
    postcss: PostCssConfig
  }

  namespace Framework {
    interface Extensions {
      '@roots/bud-postcss': BudPostCssExtension
    }

    namespace Hooks {
      interface Loaders {
        postcss: Build.Loader
      }

      interface Items {
        postcss: Build.Item
      }
    }
  }
}

export const {name, api, boot} = BudPostCssExtension

export {PostCssConfig}
