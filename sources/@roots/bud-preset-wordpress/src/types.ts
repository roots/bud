import '@roots/bud/types'
import '@roots/bud-preset-recommend/types'
import '@roots/bud-react/types'
import '@roots/bud-tailwindcss-theme-json/types'
import '@roots/bud-wordpress-manifests/types'
import '@roots/bud-wordpress-theme-json/types'
import '@roots/wordpress-hmr/types'

import type {PublicExtensionApi} from '@roots/bud-framework/extension'

import type BudPresetWordPress from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    wp: PublicExtensionApi<BudPresetWordPress>
  }

  interface Modules {
    '@roots/bud-preset-wordpress': {}
    '@roots/bud-tailwind-theme-json'?: {}
  }
  interface Loaders {
    '@roots/wordpress-hmr/loader': any
  }
  interface Items {
    '@roots/wordpress-hmr/loader': any
  }
}
