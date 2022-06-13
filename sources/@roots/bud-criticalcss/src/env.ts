import type {critical} from './critical.js'
import type Extension from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    critical: critical
  }

  interface Modules {
    '@roots/bud-criticalcss': Extension
  }
}
