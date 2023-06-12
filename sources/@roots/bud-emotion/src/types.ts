import type {BudEmotion} from './extension.js'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-emotion': BudEmotion
  }
}
