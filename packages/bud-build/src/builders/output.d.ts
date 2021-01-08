/// <reference types="webpack" />
import { Framework, Webpack } from '@roots/bud-typings';
export declare type Output = Webpack.Configuration['output'];
export declare namespace Output {
    type Build = (this: Framework) => {
        output: Output;
    };
}
export declare const output: Output.Build;
//# sourceMappingURL=output.d.ts.map