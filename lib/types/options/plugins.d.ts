export declare type Copy = {
    patterns: string[];
};
declare const plugins: {
    clean: {};
    /**
     * Compression webpack plugin.
     */
    compression: {
        /**
         * Brotli compression
         */
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
        /**
         * Gzip compression
         */
        gzip: {
            filename: string;
            algorithm: string;
            test: RegExp;
            threshold: number;
            minRatio: number;
        };
    };
    /**
     * Copy webpack plugin.
     * @see bud.copy
     */
    copy: {
        patterns: any[];
    };
    /**
     * HTML webpack plugin
     */
    html: {
        replacements: {};
        /**
         * This is a little hackish but this is just
         * initial state.. and it _does_ resolve.
         */
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
    /**
     * Ignore emit options.
     */
    ignoreEmit: RegExp[];
    /**
     * Terser options
     */
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
export { plugins as default };
