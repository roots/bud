/// <reference path="../../bud/lib/index.d.ts" />
/// <reference path="../../bud-tailwindcss/lib/index.d.ts" />
/// <reference path="../../bud-wordpress-theme-json/lib/index.d.ts" />

import type {TailwindThemeJSON} from './extension.js'

declare module '@roots/bud-wordpress-theme-json' {
  interface WordPressThemeJSON {
    useTailwindColors: TailwindThemeJSON[`useTailwindColors`]
    useTailwindFontFamily: TailwindThemeJSON[`useTailwindFontFamily`]
    useTailwindFontSize: TailwindThemeJSON[`useTailwindFontSize`]
  }
}

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-tailwindcss-theme-json': TailwindThemeJSON
  }
}
