/// <reference types="webpack-dev-server" />
import type { Configuration as WebpackConfig } from 'webpack';
import type { Bud } from '../..';
export type { Extension } from '../../repositories/plugins/types';
export type { Bud };
export declare type BuilderController = {
    bud: Bud;
    final: WebpackConfig;
    builders: RegisteredBuilder[];
    make: () => WebpackConfig;
};
export declare type RegisteredBuilder = [string, BuilderConstructor];
export declare type BuilderConstructor = (bud: Bud) => Builder;
export declare interface Builder {
    bud: Bud;
    name?: any;
    options?: any;
    final?: any;
    target?: any;
    make: () => any;
}
export declare interface EntryBuilder extends Builder {
    make: () => WebpackConfig['entry'];
}
export declare interface OutputBuilder extends Builder {
    make: () => WebpackConfig['output'];
}
//# sourceMappingURL=types.d.ts.map