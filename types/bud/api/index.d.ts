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
    dist: (relativePath: string) => string;
    distPath: (dir: string) => import("./types").Bud;
    dump: (enabled?: boolean) => import("./types").Bud;
    env: (key: string | number) => any;
    hash: (enabled?: boolean) => any;
    hot: (enabled?: boolean) => import("./types").Bud;
    inlineManifest: import("./types").InlineManifest;
    map: import("./types").SourceMap;
    mini: import("./types").Mini;
    postCss: import("./types").PostCss;
    preset: import("./types").Preset;
    project: (relativePath: string) => string;
    projectPath: (dir: string) => import("./types").Bud;
    publicPath: (dir: string) => import("./types").Bud;
    purge: ({ enabled, ...options }: {
        [x: string]: any;
        enabled?: boolean;
    }) => import("./types").Bud;
    register: import("./types").Register;
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