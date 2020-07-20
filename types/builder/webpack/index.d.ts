/**
 * Constructs WebpackBuilder object
 *
 * @constructor
 * @param {bud} bud
 * @return {WebpackBuilder}
 */
declare const webpackConfig: WebpackBuilderConstructor;
export { webpackConfig };
import type { bud } from '../index';
import type { Configuration } from 'webpack';
export declare type WebpackBuilderConstructor = (bud: bud) => WebpackBuilder;
export declare type WebpackBuilder = {
    bud: bud;
    options: Object;
    mergeConfig: (configValues: Object) => void;
    compile: () => Configuration;
    doHook: (string: any, any: any) => void;
};
