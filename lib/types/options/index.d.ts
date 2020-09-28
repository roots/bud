/// <reference types="webpack" />
/**
 * Options container repository
 */
export declare const options: {
    /**
     * Postcss options
     */
    postcss: import("./postcss").PostCssOptionsInterface;
    /**
     * Development server options.
     */
    server: any;
    /**
     * Webpack options.
     */
    webpack: import("webpack").Configuration;
    /**
     * Webpack plugin options.
     */
    plugins: {
        clean: {};
        compression: {
            brotli: {
                filename: string;
                algorithm: string;
                test: RegExp;
                compressionOptions: {
                    level: number;
                };
                threshold: number;
                minRatio: number;
                deleteOriginalAssets: boolean;
            };
            gzip: {
                filename: string;
                algorithm: string;
                test: RegExp;
                threshold: number;
                minRatio: number;
            };
        };
        copy: {
            patterns: any[];
        };
        html: {
            replacements: {};
            template: string;
            minify: {
                removeComments: boolean;
                collapseWhitespace: boolean;
                removeRedundantAttributes: boolean;
                useShortDoctype: boolean;
                removeEmptyAttributes: boolean;
                removeStyleLinkTypeAttributes: boolean;
                keepClosingSlash: boolean;
                minifyJS: boolean;
                minifyCSS: boolean;
                minifyURLs: boolean;
            };
        };
        ignoreEmit: RegExp[];
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
    /**
     * @todo Junk drawer..
     */
    split: {
        maxChunks: number;
    };
    filenameTemplate: {
        hashed: string;
        default: string;
    };
    manifest: {
        name: string;
    };
};
