import type {Factory} from './index.js'

export const optimization: Factory<`optimization`> = async ({
  hooks: {filter},
  isDevelopment,
  isProduction,
  mode,
}) =>
  filter(`build.optimization`, {
    emitOnErrors: filter(`build.optimization.emitOnErrors`, isDevelopment),
    innerGraph: filter(`build.optimization.innerGraph`, isProduction),
    mergeDuplicateChunks: filter(
      `build.optimization.mergeDuplicateChunks`,
      isProduction,
    ),
    minimize: filter(`build.optimization.minimize`, isProduction),
    minimizer: filter(`build.optimization.minimizer`, []),
    moduleIds: filter(`build.optimization.moduleIds`, `named`),
    nodeEnv: filter(`build.optimization.nodeEnv`, mode),
    providedExports: filter(
      `build.optimization.providedExports`,
      isProduction,
    ),
    /**
     * Will be new default in webpack 6
     * @see {@link https://webpack.js.org/configuration/optimization/#optimizationremoveavailablemodules}
     */
    removeAvailableModules: filter(
      `build.optimization.removeAvailableModules`,
      false,
    ),
    removeEmptyChunks: filter(
      `build.optimization.removeEmptyChunks`,
      isProduction,
    ),
    runtimeChunk: filter(`build.optimization.runtimeChunk`, `single`),
    sideEffects: filter(`build.optimization.sideEffects`, isProduction),
    splitChunks: filter(`build.optimization.splitChunks`, false),
    usedExports: filter(`build.optimization.usedExports`, isProduction),
  })
