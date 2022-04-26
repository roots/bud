import BudEmotion from './extension'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-emotion': BudEmotion
  }
}
