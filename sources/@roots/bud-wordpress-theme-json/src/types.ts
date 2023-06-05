import type {Api, WordPressThemeJSON} from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    wpjson: Api
  }

  interface Modules {
    '@roots/bud-wordpress-theme-json': WordPressThemeJSON
    '@roots/bud-tailwindcss-theme-json?': any
  }
}

declare module '@roots/bud' {
  interface Bud {
    wpjson: Api
  }

  interface Modules {
    '@roots/bud-wordpress-theme-json': WordPressThemeJSON
    '@roots/bud-tailwindcss-theme-json?': any
  }
}
