/// <reference types="@roots/bud" />
/// <reference types="@roots/bud-framework" />
/// <reference types="@roots/bud-preset-recommend" />
/// <reference types="@roots/bud-react" />
/// <reference types="@roots/bud-wordpress-manifests" />
/// <reference types="@roots/bud-wordpress-theme-json" />

import '@roots/bud-tailwindcss-theme-json/types'

import type { PublicExtensionApi } from '@roots/bud-framework/extension'

import type WP from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    wp: PublicExtensionApi<WP>
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
