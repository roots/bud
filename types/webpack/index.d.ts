/**
 * Constructs WebpackBuilder object
 *
 * @constructor
 * @param {bud} bud
 * @return {WebpackBuilder}
 */
declare const webpackBuilder: (bud: Bud) => WebpackBuilder;
export { webpackBuilder };
import type { Bud } from '../bud';
import type { Configuration } from 'webpack';
export declare type WebpackBuilder = {
    bud: Bud;
    options: Object;
    mergeConfig: (configValues: Object) => void;
    compile: () => Configuration;
    doHook: (name: string, ...any: any) => void;
};
//# sourceMappingURL=index.d.ts.map