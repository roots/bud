import '@roots/bud-wordpress-theme-json/types'
import '@roots/bud/types'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-tailwindcss-theme-json'?: any
  }
}
