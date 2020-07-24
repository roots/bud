/**
 * scss
 */
declare const scss: (bud: any) => {
    bud: any;
    output: {};
    test: RegExp;
    miniCss: string;
    css: string;
    resolveUrl: any;
    postCss: any;
    scss: {
        loader: string;
        options: {
            sourceMap: boolean;
            implementation: any;
        };
    };
    /**
     * Make SCSS loaders object.
     */
    make: () => any;
    /**
     * hook: pre_scss
     */
    pre: () => void;
    /**
     * hook: post_scss
     */
    post: () => void;
};
export { scss };
//# sourceMappingURL=scss.d.ts.map