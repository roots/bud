import {Write} from './Write'

declare module '@roots/bud-framework' {
  interface Framework {
    write: typeof Write
  }
}
