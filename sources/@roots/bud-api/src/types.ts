import type {Repository} from './repository.js'

declare module '@roots/bud-framework' {
  interface Bud extends Repository {}
}
