/**
 * CSS modules
 *
 * @return {object}
 */
declare const module: (bud: any) => {
    bud: any;
    rule: {
        test: RegExp;
        use: any[];
    };
    /**
     * Make CSS Modules object
     */
    make: () => any;
    /**
     * hook: pre_css_module
     */
    pre: () => void;
    /**
     * hook: post_css_module
     */
    post: () => void;
};
export { module };
//# sourceMappingURL=module.d.ts.map