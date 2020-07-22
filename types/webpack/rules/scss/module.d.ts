/**
 * SCSS modules
 * @typedef {function} cssModule
 * @return {object}
 */
declare const module: (builder: any) => {
    builder: any;
    output: {};
    test: RegExp;
    miniCss: any;
    css: {
        loader: string;
        options: {
            modules: boolean;
            onlyLocals: boolean;
        };
    };
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
     * hook: pre_scss_module
     */
    pre: () => void;
    /**
     * hook: post_scss_module
     */
    post: () => void;
};
export { module };
//# sourceMappingURL=module.d.ts.map