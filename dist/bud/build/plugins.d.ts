/**
 * Webpack plugins.
 */
declare const plugins: (bud: any) => {
    bud: any;
    adapters: any;
    make: () => {
        plugins: any;
    };
    doHook: (name: any) => void;
};
export { plugins };
//# sourceMappingURL=plugins.d.ts.map