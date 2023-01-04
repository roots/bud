/// <reference path="../../bud/lib/index.d.ts" />
/// <reference path="../../bud-preset-recommend/lib/index.d.ts" />
/// <reference path="../../bud-react/lib/index.d.ts" />
/// <reference path="../../bud-wordpress-externals/lib/index.d.ts" />
/// <reference path="../../bud-wordpress-dependencies/lib/index.d.ts" />
/// <reference path="../../bud-wordpress-manifests/lib/index.d.ts" />
/// <reference path="../../bud-wordpress-theme-json/lib/index.d.ts" />
/// <reference path="../../bud-tailwindcss-theme-json/lib/index.d.ts" />

import type BudTailwindThemeJSON from '@roots/bud-tailwindcss-theme-json'

import type BudPresetWordPress from './extension.js'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-preset-wordpress': BudPresetWordPress
    '@roots/bud-tailwind-theme-json'?: BudTailwindThemeJSON
  }
}
