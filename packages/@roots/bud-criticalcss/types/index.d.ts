import type { Framework, WebpackPlugin } from '@roots/bud-framework';
import { CriticalCssWebpackPlugin } from '@roots/critical-css-webpack-plugin';
declare type BudCriticalCssPlugin = WebpackPlugin<CriticalCssWebpackPlugin, CriticalCssWebpackPlugin['options']>;
declare module '@roots/bud-framework' {
    interface Framework {
        /**
         * Extract critical CSS
         *
         * @usage
         * ```js
         * app.critical({
         *  // ...
         * })
         * ```
         */
        critical: CriticalCssExtension.Configure;
    }
    namespace Framework {
        interface Extensions {
            '@roots/bud-criticalcss': BudCriticalCssPlugin;
        }
    }
}
declare namespace CriticalCssExtension {
    type Configure = (options: CriticalCssWebpackPlugin['options']) => Framework;
    type Options = CriticalCssWebpackPlugin['options'];
}
declare const BudCriticalCssPlugin: BudCriticalCssPlugin;
export declare const name: string | number, options: any, make: import("@roots/bud-framework/types/Module").Module.Make<CriticalCssWebpackPlugin & {
    apply: any;
}, import("@roots/critical-css-webpack-plugin").Options>, when: import("@roots/bud-framework/types/Module").Module.When<import("@roots/critical-css-webpack-plugin").Options>, api: import("@roots/bud-framework/types/Module").Module.Api;
export {};
//# sourceMappingURL=index.d.ts.map