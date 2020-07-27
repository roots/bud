/**
 * Hook: useWebpack
 * @prop {compiler} compiler webpack.compiler
 * @prop {string}   options  project options
 */
export function useWebpack({ compiler, bud }: {
    compiler: any;
    bud: any;
}): {
    assets: any[];
    devServer: any;
    errors: any[];
    hash: any;
    time: any;
    warnings: any[];
    percentage: any;
    message: any;
};
//# sourceMappingURL=useWebpack.d.ts.map