import {Item, Loader} from '@roots/bud-build'
import {Extension} from '@roots/bud-framework/extension'

import BudMDX from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    /**
     * Configure mdx to suit your application needs
     */
    mdx: BudMDX
  }

  interface Loaders {
    mdx: Loader
  }

  interface Items {
    mdx: Item
  }

  /**
   * {@inheritDoc @roots/bud-framework#Modules}
   * @public @override
   */
  interface Modules {
    '@roots/bud-mdx': Extension
  }

  namespace Store {
    interface Repository {
      'patterns.mdx': RegExp
    }
  }
}
