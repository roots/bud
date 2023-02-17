import type {Factory} from './index.js'

export const optimization: Factory<`optimization`> = async ({
  hooks: {filter},
  isDevelopment,
  isProduction,
}) =>
  filter(`build.optimization`, {
    emitOnErrors: filter(`build.optimization.emitOnErrors`, isDevelopment),
    minimize: filter(`build.optimization.minimize`, isProduction),
    minimizer: filter(`build.optimization.minimizer`, []),
    moduleIds: filter(`build.optimization.moduleIds`, `named`),
    removeEmptyChunks: filter(
      `build.optimization.removeEmptyChunks`,
      false,
    ),
    runtimeChunk: filter(`build.optimization.runtimeChunk`, false),
    splitChunks: filter(`build.optimization.splitChunks`, false),
    usedExports: filter(`build.optimization.usedExports`, isProduction),
  })
