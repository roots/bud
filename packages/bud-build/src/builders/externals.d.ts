/// <reference types="webpack" />
import { Framework, Webpack } from '@roots/bud-typings';
export declare type Externals = Webpack.Configuration['externals'];
export declare namespace Externals {
    type Build = (this: Framework) => {
        externals: Externals;
    };
}
export declare const externals: Externals.Build;
//# sourceMappingURL=externals.d.ts.map