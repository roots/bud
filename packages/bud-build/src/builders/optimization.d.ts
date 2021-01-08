/// <reference types="webpack" />
import { Framework, Webpack } from '@roots/bud-typings';
export declare type Optimization = Webpack.Configuration['optimization'];
export declare namespace Optimization {
    type Build = (this: Framework) => {
        optimization: Optimization;
    };
}
/**
 * Webpack.Optimization
 */
export declare const optimization: Optimization.Build;
//# sourceMappingURL=optimization.d.ts.map