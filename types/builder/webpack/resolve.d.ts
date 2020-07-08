export = resolve;
/**
 * Webpack resolves.
 */
declare function resolve({ options, paths }: {
    options: any;
    paths: any;
}): {
    resolve: {
        extensions: string[];
        modules: string[];
    };
};
//# sourceMappingURL=resolve.d.ts.map