/**
 * Bud.Bud export
 */
export declare const api: {
    alias: Alias;
    auto: Auto;
    babel: Babel;
    bundle: Bundle;
    copy: Copy;
    copyAll: CopyAll;
    src: Src;
    srcPath: SrcPath;
    sync: Sync;
    watch: Watch;
};
export declare type Api = {
    alias: Alias;
    auto: Auto;
    babel: Babel;
    bundle: Bundle;
    copy: Copy;
    copyAll: CopyAll;
    src: Src;
    srcPath: SrcPath;
    sync: Sync;
    watch: Watch;
};
/**
 * bud.Bud typings
 */
import { Bud } from '..';
export { Bud } from '..';
import type { Options as BrowserSyncOptions } from 'browser-sync';
export declare type Alias = (object: any) => Bud;
export declare type Auto = (options: {
    [key: string]: string[];
}) => Bud;
export declare type Babel = (arg0: BabelOptions) => Bud;
export declare type Bundle = (name: string, entries: Object) => Bud;
export declare type Copy = (from: string, to: string) => Bud;
export declare type CopyAll = (from: string, to: string) => Bud;
export declare type Debug = (enabled: boolean) => any;
export declare type Src = (relativePath: string) => string;
export declare type SrcPath = (src: string) => Bud;
export declare type Sync = (arg0: SyncOptions) => Bud;
export declare type Watch = (enabled: boolean) => Bud;
export interface BabelOptions {
    presets: [];
    plugins: [];
}
export interface SyncOptions {
    enabled?: boolean;
    options: BrowserSyncOptions;
}
//# sourceMappingURL=index.d.ts.map