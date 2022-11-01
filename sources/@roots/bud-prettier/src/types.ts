import type {Extension} from '@roots/bud-framework/extension'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-prettier': Extension
  }
}
