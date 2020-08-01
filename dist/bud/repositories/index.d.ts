export declare const repositories: {
    configs: (framework: any) => import("../container").Repository;
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
        dev: any;
        dependencyManifest: import("@wordpress/dependency-extraction-webpack-plugin/build-types").Options;
        devtool: string;
        extensions: string[];
        filenameTemplate: {
            hashed: string;
            default: string;
        };
        inlineManifest: {
            name: string;
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
        watch: string[];
    };
    paths: {
        project: string;
        framework: string;
        src: string;
        dist: string;
        public: string;
    };
    flags: (framework: any) => {
        mode: any;
        hot: any;
        watch: any;
        host: any;
        port: any;
        proxy: any;
        src: any;
        dist: any;
        feature: any;
    };
    env: (framework: any) => import("dotenv/types").DotenvParseOutput;
    adapters: import("./plugins/types").PluginsRepo;
    plugins: import("./plugins/types").PluginsRepo;
};
//# sourceMappingURL=index.d.ts.map