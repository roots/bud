/// <reference types="@roots/bud" />
/// <reference types="@roots/bud-framework" />
/// <reference types="@roots/bud-preset-recommend" />
/// <reference types="@roots/bud-react" />
/// <reference types="@roots/bud-wordpress-manifests" />
/// <reference types="@roots/bud-wordpress-theme-json" />

import '@roots/bud-tailwindcss-theme-json/types'

declare module '@roots/bud-framework' {
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
