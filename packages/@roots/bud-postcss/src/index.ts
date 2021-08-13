import type {Build, Module} from '@roots/bud-framework'

import {Config} from './Config'
import * as extension from './extension'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * Configure postcss.
     */
    postcss: Config
  }

  namespace Framework {
    interface Extensions {
      '@roots/bud-postcss': Module
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

export {extension, extension as default}

export const {name, api, boot} = extension

export {Config}
