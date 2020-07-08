export default useWebpack;
/**
 * Hook: useWebpack
 * @prop {compiler} compiler webpack.compiler
 * @prop {string}   options  project options
 */
declare function useWebpack({ compiler, config }: {
    compiler: any;
    config: any;
}): {
    assets: any[];
    errors: any[];
    hash: any;
    time: any;
    warnings: any[];
    percentage: number;
    message: any;
};
//# sourceMappingURL=useWebpack.d.ts.map