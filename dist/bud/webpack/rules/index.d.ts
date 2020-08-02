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
    make: () => any;
};
export { rules };
//# sourceMappingURL=index.d.ts.map