import { Bud } from '../types';
export { Bud } from '../types';
export { RegisteredPlugin } from '../plugin/types';
import type { Options as BrowserSyncOptions } from 'browser-sync';
export declare type Alias = (arg0: object) => Bud;
export declare type Auto = (options: {
    [key: string]: string[];
}) => Bud;
export declare type Babel = (arg0: BabelProperties) => Bud;
export declare type Bundle = (name: string, entries: Object) => Bud;
export declare type Copy = (from: string, to: string) => Bud;
export declare type Dashboard = (enabled: boolean) => Bud;
export declare type Debug = (enabled: boolean) => any;
export declare type DependencyManifest = (settings?: object) => Bud;
export declare type Dev = (options: object) => Bud;
export declare type Devtool = (devtool: string) => Bud;
export declare type Dist = (relativePath: string) => string;
export declare type DistPath = (src: string) => Bud;
export declare type InlineManifest = (name?: string) => Bud;
export declare type Mini = (enabled?: boolean) => Bud;
export declare type PostCss = (options?: {
    enabled?: boolean;
    plugins?: any[];
}) => Bud;
export declare type Preset = (relativePath: string) => any;
export declare type Project = (relativePath: string) => string;
export declare type ProjectPath = (relativePath: string) => Bud;
export declare type Purge = (any: any) => Bud;
export declare type Resolve = (moduleName: string) => string;
export declare type Register = (name: string, plugin: any) => Bud;
export declare type SourceMap = (enabled?: boolean) => Bud;
export declare type Src = (relativePath: string) => string;
/**
 * ## bud.srcPath
 *
 * Set the project's src directory.
 *
 *  ```js
 * bud.srcPath('src') // default unless specified
 * ```
 */
export declare type SrcPath = (src: string) => Bud;
export declare type Sync = (arg0: SyncOptions) => Bud;
export declare type Target = (target: string) => Bud;
export declare type Translate = (output: string) => Bud;
export declare type Watch = (options: {
    paths: string[];
    enabled: boolean;
}) => Bud;
export declare type Vendor = (name?: string) => Bud;
export declare type Api = {
    alias: Alias;
    auto: Auto;
    babel: Babel;
    bundle: Bundle;
    copy: Copy;
    copyAll: Copy;
    dashboard: Dashboard;
    debug: Debug;
    dependencyManifest: DependencyManifest;
    dev: Dev;
    devtool: Devtool;
    features: any;
    inlineManifest: InlineManifest;
    map: SourceMap;
    mini: Mini;
    postCss: PostCss;
    preset: Preset;
    projectPath: ProjectPath;
    resolve: Resolve;
    register: Register;
    scss: any;
    src: Src;
    srcPath: SrcPath;
    sync: Sync;
    target: Target;
    translate: Translate;
    vendor: Vendor;
    watch: Watch;
};
export interface BabelProperties {
    presets: [];
    plugins: [];
}
export interface SyncOptions {
    enabled?: boolean;
    options: BrowserSyncOptions;
}
//# sourceMappingURL=types.d.ts.map