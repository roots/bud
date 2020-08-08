declare const webpackResolve: (bud: any) => {
    bud: any;
    target: {
        resolve: {
            extensions: string[];
            modules: any[];
        };
    };
    extensions: string[];
    make: () => any;
    /**
     * Ensure extensions supported
     */
    ensureSupport: (ext: any) => void;
};
export { webpackResolve };
//# sourceMappingURL=webpackResolve.d.ts.map