/**
 * Hook: useWebpack
 * @prop {compiler} compiler webpack.compiler
 * @prop {string}   options  project options
 */
export function useWebpack({ compiler, config }: {
    compiler: any;
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
