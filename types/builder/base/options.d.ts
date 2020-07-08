/**
 * Options container.
 */
export type options = any;
/**
 * Environment variables container.
 */
export type env = any;
/**
 * Options container.
 * @typedef {Object} options
 */
export const options: {
    auto: {};
    browserSync: {
        host: string;
        port: string;
        proxy: string;
    };
    copy: {
        patterns: any[];
    };
    dev: {
        disableHostCheck: boolean;
        headers: {
            'Access-Control-Allow-Origin': string;
        };
        hot: boolean;
        watchOptions: {
            aggregateTimeout: number;
        };
    };
    devtool: string;
    entry: {};
    env: dotenv.DotenvParseOutput;
    inlineManifest: {
        name: string;
    };
    splitting: {
        maxChunks: any;
    };
    dependencyManifest: {
        useDefaults: boolean;
        injectPolyfill: boolean;
        outputFormat: string;
    };
    babel: any;
    postCss: any;
    svg: {
        use: string[];
    };
};
import dotenv from "dotenv/types";
//# sourceMappingURL=options.d.ts.map