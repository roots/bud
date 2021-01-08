/// <reference types="webpack" />
import { Webpack, Framework } from '@roots/bud-typings';
declare type Rules = Webpack.Configuration['module']['rules'];
declare type Build = (this: Framework) => {
    rules: Rules;
};
export declare const rules: Build;
export {};
//# sourceMappingURL=index.d.ts.map