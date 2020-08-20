import type { BabelConfiguration, Copy, PostCssConfiguration } from './types';
declare const babel: (configs: any) => BabelConfiguration;
declare const browserSync: (flags: any) => any;
declare const postCss: (configs: any) => PostCssConfiguration;
/**
 * Options container.
 */
declare const options: {
    copy: Copy;
    dev: {
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
    inlineManifest: {
        name: string;
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
export { options, babel, browserSync, postCss };
//# sourceMappingURL=options.d.ts.map