/**
 * Adds React to `@roots/bud`
 *
 * @packageDocumentation
 */
import {BudReactExtension} from './BudReactExtension'
import {BudReactRefreshPlugin} from './BudReactRefreshPlugin'
import {reactRefresh} from './reactRefresh'
declare module '@roots/bud-framework' {
  interface Framework {
    reactRefresh: reactRefresh
  }
  namespace Framework {
    interface Extensions {
      '@roots/bud-react': BudReactExtension
      '@pmmmwh/react-refresh-webpack-plugin': BudReactRefreshPlugin
    }
  }
}
export declare const name: string | number,
  boot: import('@roots/bud-framework/types/Module').Module.Boot
//# sourceMappingURL=index.d.ts.map
