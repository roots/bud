export declare const repositories: {
    configs: (paths: any) => any;
    features: {
        dashboard: boolean;
        clean: boolean;
        css: boolean;
        svg: boolean;
        image: boolean;
        font: boolean;
        js: boolean;
        manifest: boolean;
        optimize: boolean;
        terser: boolean;
        vendor: boolean;
        splitting: boolean;
        minify: boolean;
        react: boolean;
        browserSync: boolean;
        dependencyManifest: boolean;
        dump: boolean;
        hash: boolean;
        hot: boolean;
        inlineManifest: boolean;
        overlay: boolean;
        scss: boolean;
        cssModules: boolean;
        scssModules: boolean;
        purge: boolean;
        sourceMap: boolean;
        translate: boolean;
        uglify: boolean;
        watch: boolean;
        debug: boolean;
    };
    options: {
        copy: import("./types").Copy;
        dependencyManifest: import("@wordpress/dependency-extraction-webpack-plugin/build-types").Options;
        dev: {};
        devtool: string;
        extensions: string[];
        filenameTemplate: {
            hashed: string;
            default: string;
        };
        headers: {
            'Access-Control-Allow-Origin': string;
            'Access-Control-Allow-Methods': string;
            'Access-Control-Allow-Headers': string;
        };
        inlineManifest: {
            name: string;
        };
        postCss: {};
        scss: {};
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
        uglify: {
            cache: boolean;
            chunkFilter: ({ name }: {
                name: any;
            }) => boolean;
            extractComments: boolean;
            parallel: boolean;
            uglifyOptions: {
                output: {
                    beautify: boolean;
                };
                compress: boolean;
                mangle: {
                    toplevel: boolean;
                };
            };
        };
        vendor: {
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
    paths: {
        cwd: string;
        project: string;
        framework: string;
        src: string;
        dist: string;
        public: string;
    };
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
    env: (paths: any) => import("dotenv/types").DotenvParseOutput;
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
    rules: ((bud: any) => {
        test: any;
        exclude: any;
        use: {
            loader: any;
            options: any;
        }[];
    })[];
    plugins: import("./plugins/types").PluginsRepo;
    presets: {
        postCss: {
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