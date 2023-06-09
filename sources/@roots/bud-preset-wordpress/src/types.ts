import type {PublicExtensionApi} from '@roots/bud-framework/extension'

import type BudPresetWordPress from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    wp: PublicExtensionApi<BudPresetWordPress>
  }

  interface Modules {
    '@roots/bud-preset-wordpress': BudPresetWordPress
  }
  interface Loaders {
    '@roots/wordpress-hmr/loader': any
  }
  interface Items {
    '@roots/wordpress-hmr/loader': any
  }
}
