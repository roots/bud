/**
 * Webpack resolvers.
 *
 * @param {Bud} bud
 * @return {object}
 */
declare const webpackResolve: (bud: any) => {
    bud: any;
    options: {
        resolve: {
            extensions: any;
            modules: any[];
        };
    };
    make: () => any;
};
export { webpackResolve };
//# sourceMappingURL=webpackResolve.d.ts.map