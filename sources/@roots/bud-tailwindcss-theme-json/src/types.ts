/// <reference types="@roots/bud" />
/// <reference types="@roots/bud-tailwindcss" />
/// <reference types="@roots/bud-wordpress-theme-json" />

import type WordPressThemeJSON from '@roots/bud-wordpress-theme-json'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-tailwindcss-theme-json': WordPressThemeJSON
  }
}
