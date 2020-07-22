/**
 * Webpack loaders
 * @type {function} rules
 */
declare const rules: (bud: any) => {
    bud: any;
    output: {};
    options: {
        module: {
            strictExportPresence: boolean;
        };
    };
    /**
     * Make webpack rules
     */
    make: () => any;
    /**
     * Hook: pre_modules
     */
    preHook: () => void;
    /**
     * Hook post_modules
     */
    postHook: () => void;
};
export { rules };
//# sourceMappingURL=index.d.ts.map