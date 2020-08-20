export declare const repositories: {
    configs: (paths: any) => any;
    features: {
        dashboard: boolean;
        clean: boolean;
        manifest: boolean;
        postCss: boolean;
        browserSync: boolean;
        hash: boolean;
        hot: boolean;
        minify: boolean;
        splitting: boolean;
        vendor: boolean;
        runtimeManifest: boolean;
        overlay: boolean;
        sourceMap: boolean;
        watch: boolean;
        debug: boolean;
    };
    options: {
        copy: import("./types").Copy;
        devServer: {
            headers: {
                'Access-Control-Allow-Origin': string;
                'Access-Control-Allow-Methods': string;
                'Access-Control-Allow-Headers': string;
            };
        };
        devtool: string;
        filenameTemplate: {
            hashed: string;
            default: string;
        };
        optimization: {
            runtimeChunk: {
                name: (entrypoint: any) => string;
            };
            splitChunks: {
                cacheGroup: {
                    vendor: {
                        test: RegExp;
                        name: string;
                        chunks: string;
                        priority: number;
                    };
                };
            };
        };
        patterns: any[];
        postCss: {};
        resolve: {
            alias: boolean;
            extensions: string[];
        };
        splitting: {
            maxChunks: any;
        };
        target: "web";
        terser: {
            terserOptions: {
                parse: {
                    ecma: number;
                };
                compress: {
                    ecma: number;
                    warnings: boolean;
                    comparisons: boolean;
                    inline: number;
                };
                mangle: {
                    safari10: boolean;
                };
                output: {
                    ecma: number;
                    comments: boolean;
                    ascii_only: boolean;
                };
            };
            cache: boolean;
            parallel: boolean;
        };
        stats: {
            version: boolean;
            hash: boolean;
            assets: boolean;
            errors: boolean;
            warnings: boolean;
        };
        node: {
            module: string;
            dgram: string;
            dns: string;
            fs: string;
            http2: string;
            net: string;
            tls: string;
            child_process: string;
        };
    };
    loaders: {
        babel: string;
        css: string;
        file: string;
        miniCss: string;
        postCss: string;
        resolveUrl: string;
        style: string;
        svgr: string;
        url: string;
    };
    paths: import("@roots/bud-typings").Loose;
    cli: {
        args: (env: any) => {
            log: unknown;
            hot: unknown;
            watch: unknown;
            level: unknown;
            mode: any;
            host: any;
            port: any;
            proxy: any;
            src: any;
            dist: any;
            feature: any;
        };
        flags: {
            log: boolean;
            hot: boolean;
            watch: boolean;
        };
    };
    env: (paths: import("@roots/bud-typings").Loose) => import("@roots/bud-typings").Loose;
    adapters: import("./plugins/types").PluginsRepo;
    patterns: {
        js: RegExp;
        ts: RegExp;
        vue: RegExp;
        scss: RegExp;
        scssModule: RegExp;
        css: RegExp;
        cssModule: RegExp;
        svg: RegExp;
        font: RegExp;
        vendor: RegExp;
        image: RegExp;
    };
    rules: ((bud: import("./types").Bud) => import("webpack").RuleSetRule)[];
    uses: import("./rulesets/uses").UsesHash;
    plugins: import("./plugins/types").PluginsRepo;
    presets: {
        postcss: {
            config: {
                plugins: any[];
            };
            file: string;
        };
        "babel-wp": {
            config: (any: any) => {
                presets: any[];
                plugins: any[];
            };
            file: string;
        };
    };
};
//# sourceMappingURL=index.d.ts.map