import type { Configuration } from 'webpack';
import type { Hooks } from './hooks/types';
import type { Plugin } from './plugin/types';
import type { State } from './state/types';
import type { Util } from './util/types';
import type * as Api from './api/types';
export declare type Mode = Configuration['mode'];
export declare type Production = boolean;
export declare type Bud = {
    hooks: Hooks;
    util: Util;
    plugin: Plugin;
    mode: Mode;
    inProduction: Production;
    state: State;
    alias: Api.Alias;
    auto: Api.Auto;
    babel: Api.Babel;
    bundle: Api.Bundle;
    copy: Api.Copy;
    copyAll: Api.Copy;
    dashboard: Api.Dashboard;
    debug: Api.Debug;
    dependencyManifest: Api.DependencyManifest;
    dev: Api.Dev;
    devtool: Api.Devtool;
    dist: Api.Dist;
    distPath: Api.DistPath;
    env: any;
    hash: any;
    inlineManifest: Api.InlineManifest;
    map: Api.SourceMap;
    mini: Api.Mini;
    postCss: Api.PostCss;
    preset: Api.Preset;
    project: Api.Project;
    purge: Api.Purge;
    register: Api.Register;
    resolve: any;
    src: Api.Src;
    srcPath: Api.SrcPath;
    sync: Api.Sync;
    target: Api.Target;
    translate: Api.Translate;
    vendor: Api.Vendor;
    watch: Api.Watch;
};
/**
 * Bud - asset management framework.
 */
declare const bud: Bud;
export { bud };
//# sourceMappingURL=index.d.ts.map