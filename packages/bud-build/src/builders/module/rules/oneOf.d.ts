/// <reference types="webpack" />
import type { Webpack, Framework } from '@roots/bud-typings';
declare type Rule = Webpack.RuleSetRule;
declare type Build = (this: Framework) => Rule[];
/**
 * Filter and reduce rules into  webpack.oneOf array
 */
export declare const oneOf: Build;
export {};
//# sourceMappingURL=oneOf.d.ts.map