/**
 * Constructs WebpackBuilder object
 */
declare const webpackBuilder: (bud: Bud) => BuilderController;
export { webpackBuilder };
import type { Bud } from '../bud';
import type { Configuration as WebpackConfig } from 'webpack';
export declare type BuilderController = {
    bud: Bud;
    config: WebpackConfig;
    builders: RegisteredBuilder[];
    mergeConfig: (configValues: Object) => void;
    compile: () => WebpackConfig;
    doHook: (name: string, ...any: any) => void;
    preBuilderHook: (name: string, arg1: any) => void;
    postBuilderHook: (name: string, arg1: any) => void;
};
export declare type RegisteredBuilder = [string, BuilderConstructor];
export declare type BuilderConstructor = (bud: Bud) => Builder;
export interface Builder {
    bud: Bud;
    options?: {};
    make: () => any;
}
export interface EntryBuilder extends Builder {
    make: () => WebpackConfig['entry'];
}
//# sourceMappingURL=index.d.ts.map