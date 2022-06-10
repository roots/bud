import '@roots/bud-api';
import BudDll from './extension';
import { Plugin } from './factory';
declare module '@roots/bud-framework' {
    interface Bud {
        /**
         * Cache modules in a DLL
         *
         * @remarks
         * Enables dynamic link library ([DLL](https://en.wikipedia.org/wiki/Dynamic-link_library)) caching
         * of specified modules.
         *
         * @example
         * Supply {@link api.library} the module you would like to add to the DLL.
         *
         * ```js
         * app.library('jquery')
         * ```
         *
         * @example
         * Multiple modules can be added at once using an array
         *
         * ```js
         * app.library(['react', 'react-dom'])
         * ```
         *
         * @public
         */
        library: BudDll;
    }
    interface Modules {
        '@roots/bud-library': BudDll;
        'autodll-webpack-plugin': Plugin;
    }
}
//# sourceMappingURL=env.d.ts.map