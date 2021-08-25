import '@roots/bud-api'
import {Module} from '@roots/bud-framework'
declare module '@roots/bud-framework' {
  namespace Extensions {
    interface Definitions {
      '@roots/bud-preset-recommend': Module
    }
  }
}
export declare const name: string | number,
  register: Module.Register
//# sourceMappingURL=index.d.ts.map
