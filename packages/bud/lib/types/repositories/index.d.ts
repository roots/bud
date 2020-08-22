export declare const repositories: {
    features: {
        babel: boolean;
        clean: boolean;
        dashboard: boolean;
        manifest: boolean;
        postcss: boolean;
        browsersync: boolean;
        hash: boolean;
        hot: boolean;
        minify: boolean;
        splitting: boolean;
        vendor: boolean;
        runtimeChunk: boolean;
        overlay: boolean;
        sourceMap: boolean;
        watch: boolean;
        debug: boolean;
    };
    options: {
        resolve: {
            alias: boolean;
            extensions: string[];
        };
        devServer: {
            headers: {
                'Access-Control-Allow-Origin': string;
                'Access-Control-Allow-Methods': string;
                'Access-Control-Allow-Headers': string;
            };
        };
        devtool: string;
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
        adapters: {
            browsersync: (flags: any) => any;
            clean: {};
            fixStyleOnlyEntries: {
                silent: boolean;
            };
            hotModuleReplacement: {};
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
        };
        patterns: any[];
        postcss: (configs: any) => import("./types").PostCssConfiguration;
        babel: (configs: any) => any;
        splitting: {
            maxChunks: any;
        };
        target: any;
        copy: import("./types").Copy;
        filenameTemplate: {
            hashed: string;
            default: string;
        };
        manifest: {
            name: string;
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
    paths: any;
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
    adapters: import("./adapters").ExtensionRepository;
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
    rules: ((bud: import("./types").Bud) => any)[];
    uses: import("./rulesets/uses").UsesHash;
    configs: (paths: any) => any;
    env: (paths: any) => any;
};
//# sourceMappingURL=index.d.ts.map