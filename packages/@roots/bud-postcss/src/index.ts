import type {Build} from '@roots/bud-framework'

import PostCssConfig from './Config'
import postcss from './postcss'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * Configure postcss.
     */
    postcss: PostCssConfig
  }

  namespace Framework {
    interface Extensions {
      '@roots/bud-postcss': postcss
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

export default postcss
export const {name, api, boot} = postcss
export {PostCssConfig}
