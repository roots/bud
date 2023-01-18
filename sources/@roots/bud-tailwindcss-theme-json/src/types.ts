/// <reference types="@roots/bud" />
/// <reference types="@roots/bud-tailwindcss" />
/// <reference types="@roots/bud-wordpress-theme-json" />

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
