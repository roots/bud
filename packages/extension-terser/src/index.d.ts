import type { Module } from '@roots/bud-typings';
import type { Terser } from './typings';
export * as api from './api';
export declare const boot: Module.Boot;
export declare interface Bud {
    /**
     * ## bud.terser  [💁 Fluent]
     *
     * Configure the minifier. [🔗 Documentation](#)
     *
     * For more information on options [see the
     * terser-webpack-plugin docs](https://webpack.js.org/plugins/terser-webpack-plugin/).
     */
    terser: Terser;
}
export type { Terser };
//# sourceMappingURL=index.d.ts.map