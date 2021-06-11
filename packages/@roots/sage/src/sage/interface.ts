import '@roots/bud'
import {Module} from '@roots/bud-framework'

/**
 * Sage theme preset
 */
export type Sage = Module

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/sage': Sage
    }
  }
}
