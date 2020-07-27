/**
 * Hook: useWebpack
 * @prop {compiler} compiler webpack.compiler
 * @prop {string}   options  project options
 */
export function useWebpack({ compiler, webpackConfig, config }: {
    compiler: any;
    webpackConfig: any;
    config: any;
}): {
    assets: any[];
    errors: any[];
    hash: any;
    time: any;
    warnings: any[];
    percentage: any;
    message: any;
};
//# sourceMappingURL=useWebpack.d.ts.map