/**
 * Webpack loaders
 */
declare const rules: (bud: any) => {
    bud: any;
    target: {
        module: {
            rules: any[];
        };
    };
    make: () => any;
};
export { rules };
//# sourceMappingURL=rules.d.ts.map