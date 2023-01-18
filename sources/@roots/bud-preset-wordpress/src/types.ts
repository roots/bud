/// <reference types="@roots/bud" />
/// <reference types="@roots/bud-framework" />
/// <reference types="@roots/bud-preset-recommend" />
/// <reference types="@roots/bud-react" />
/// <reference types="@roots/bud-wordpress-manifests" />
/// <reference types="@roots/bud-wordpress-theme-json" />
/// <reference types="@roots/bud-tailwindcss" />
/// <reference types="@roots/bud-tailwindcss-theme-json" />

import type BudTailwindThemeJSON from '@roots/bud-tailwindcss-theme-json'

import type BudPresetWordPress from './extension.js'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-preset-wordpress': BudPresetWordPress
    '@roots/bud-tailwind-theme-json'?: BudTailwindThemeJSON
  }
}
