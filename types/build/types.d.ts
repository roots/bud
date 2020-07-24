import type { Configuration as WebpackConfig } from 'webpack';
import type { Bud } from '../bud/types';
export type { RegisteredPlugin } from '../bud/plugin/types';
export type { Bud };
export declare type BuilderController = {
    bud: Bud;
    config: WebpackConfig;
    builders: RegisteredBuilder[];
    mergeConfig: (configValues: Object) => void;
    makeConfig: () => WebpackConfig;
    doHook: (name: string, ...any: any) => void;
    preBuilderHook: (name: string, arg1: any) => void;
    postBuilderHook: (name: string, arg1: any) => void;
};
export declare type RegisteredBuilder = [string, BuilderConstructor];
export declare type BuilderConstructor = (bud: Bud) => Builder;
export declare interface Builder {
    bud: Bud;
    options?: {};
    make: () => any;
}
export declare interface EntryBuilder extends Builder {
    make: () => WebpackConfig['entry'];
}
//# sourceMappingURL=types.d.ts.map