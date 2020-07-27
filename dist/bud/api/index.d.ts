/**
 * Bud.Bud export
 */
export declare const api: {
    alias: import("./types").Alias;
    auto: import("./types").Auto;
    babel: import("./types").Babel;
    bundle: import("./types").Bundle;
    copy: import("./types").Copy;
    copyAll: import("./types").Copy;
    dashboard: import("./types").Dashboard;
    debug: import("./types").Debug;
    dependencyManifest: import("./types").DependencyManifest;
    dev: import("./types").Dev;
    devtool: import("./types").Devtool;
    dist: import("./types").Dist;
    distPath: import("./types").DistPath;
    dump: (enabled?: boolean) => import("./types").Bud;
    env: (key: string | number) => any;
    featureEnabled: (this: import("./types").Bud, feature: string) => boolean;
    features: (this: import("./types").Bud, features: any) => import("./types").Bud;
    hash: (enabled?: boolean) => any;
    hot: (this: import("./types").Bud, options: {
        enabled: boolean;
        target: string;
        port?: number;
        watch?: string[];
    }) => import("./types").Bud;
    inlineManifest: import("./types").InlineManifest;
    map: import("./types").SourceMap;
    mini: import("./types").Mini;
    postCss: import("./types").PostCss;
    preset: import("./types").Preset;
    project: (relativePath: string) => string;
    projectPath: (dir: string) => import("./types").Bud;
    proxy: (this: import("./types").Bud, { host, ssl }: {
        host: any;
        ssl?: boolean;
    }) => import("./types").Bud;
    publicPath: (dir: string) => import("./types").Bud;
    purge: import("./types").Purge;
    resolve: import("./types").Resolve;
    setEnv: (options: any) => import("./types").Bud;
    src: import("./types").Src;
    srcPath: import("./types").SrcPath;
    sync: import("./types").Sync;
    target: import("./types").Target;
    translate: import("./types").Translate;
    vendor: import("./types").Vendor;
    watch: import("./types").Watch;
};
//# sourceMappingURL=index.d.ts.map