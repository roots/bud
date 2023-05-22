import '@roots/bud/types'
import '@roots/bud-wordpress-theme-json/types'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-tailwindcss-theme-json'?: any
  }
}
