import type { Copy, PostCssConfiguration } from './types';
import { BabelTransformOptions } from '@roots/bud-typings';
/**
 * Options container.
 */
declare const options: {
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
    patterns: any[];
    postcss: (configs: any) => PostCssConfiguration;
    babel: (configs: any) => BabelTransformOptions;
    browsersync: (flags: any) => any;
    splitting: {
        maxChunks: any;
    };
    target: "web";
    copy: Copy;
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
    filenameTemplate: {
        hashed: string;
        default: string;
    };
    manifest: {
        name: string;
    };
};
export { options };
//# sourceMappingURL=options.d.ts.map