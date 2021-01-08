import { Module } from '@roots/bud-typings';
import * as Entrypoints from '@roots/entrypoints-webpack-plugin';
export * as api from './entrypoints';
export declare const make: Module.Make<Entrypoints.Plugin, Options>;
export declare const options: Options;
export interface Options {
    name: string;
    writeToFileEmit: boolean;
}
//# sourceMappingURL=index.d.ts.map