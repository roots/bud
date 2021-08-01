/**
 * @module @roots/bud-babel
 */

import type {Module} from '@roots/bud-framework'

import type {Babel} from './'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * babel
     *
     * Configure babel.
     */
    babel: Babel
  }

  namespace Framework {
    interface Extensions {
      '@roots/bud-babel': Module
    }

    namespace Hooks.Loader {
      interface Definitions {
        babel: string
      }
    }

    namespace Hooks.Item {
      interface Definitions {
        babel: any
      }
    }
  }
}
