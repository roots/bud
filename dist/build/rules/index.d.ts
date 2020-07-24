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
};
export { rules };
//# sourceMappingURL=index.d.ts.map