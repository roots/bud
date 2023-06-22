import type * as Extension from '@roots/bud-wordpress-theme-json/extension'

declare module '@roots/bud-framework' {
  interface Bud {
    wpjson: Extension.Api
  }

  interface Modules {
    '@roots/bud-tailwindcss-theme-json?': any
    '@roots/bud-wordpress-theme-json': Extension.WordPressThemeJSON
  }
}

export {WordPressThemeJSON as default} from '@roots/bud-wordpress-theme-json/extension'

export type {Schema as Theme} from '@roots/wordpress-theme-json-webpack-plugin'
