import '@roots/bud-babel'
import {Build, Module, WebpackPlugin} from '@roots/bud-framework'
declare const ForkTsCheckerWebpackPlugin: any
declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * Enable typescript type checking
     *
     * @usage
     * ```js
     * bud.typecheck()
     * ```
     */
    typecheck: Typescript.TypeCheck
  }
  namespace Typescript {
    type TypeCheck = (enabled?: boolean) => Framework
  }
  namespace Framework {
    interface Extensions {
      '@roots/bud-typescript': Module
      'fork-ts-checker-plugin': WebpackPlugin<
        typeof ForkTsCheckerWebpackPlugin
      >
    }
    interface Loaders {
      ts: Build.Loader
      babel: Build.Loader
    }
    interface Items {
      ts: Build.Item
      babel: Build.Item
    }
    interface Rules {
      ts: Build.Rule
    }
  }
}
export {}
//# sourceMappingURL=interface.d.ts.map
