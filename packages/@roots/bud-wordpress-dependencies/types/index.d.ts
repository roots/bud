import type {Module} from '@roots/bud-framework'
import {WordPressDependenciesWebpackPlugin as Plugin} from '@roots/wordpress-dependencies-webpack-plugin'
declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/wordpress-dependencies-webpack-plugin': Module
    }
  }
}
export declare const name: Module['name']
export declare const make: Module.Make<Plugin, null>
//# sourceMappingURL=index.d.ts.map
