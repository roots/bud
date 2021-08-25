import type {Module} from '@roots/bud-framework'
import {
  Plugin,
  WordPressExternals,
} from '@roots/wordpress-externals-webpack-plugin'
declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/wordpress-externals-webpack-plugin': Module
    }
  }
}
export declare const name: Module['name']
export declare const make: Module.Make<
  Plugin,
  WordPressExternals.Options
>
//# sourceMappingURL=index.d.ts.map
