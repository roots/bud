/**
 * Webpack loaders
 * @type {function} rules
 */
declare const rules: (bud: any) => {
    bud: any;
    options: {
        module: {
            rules: any[];
        };
    };
    /**
     * Make webpack rules
     */
    make: () => any;
};
export { rules };
//# sourceMappingURL=index.d.ts.map