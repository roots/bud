/// <reference types="webpack" />
import { Webpack, Framework } from '@roots/bud-typings';
export declare namespace Extensions {
    type Build = (this: Framework) => {
        plugins: Webpack.Configuration['plugins'];
    };
}
export declare const plugins: Extensions.Build;
//# sourceMappingURL=plugins.d.ts.map