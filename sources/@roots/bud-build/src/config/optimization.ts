import type {Bud} from '@roots/bud-framework'

import type {ValueFactory} from './builder.js'

export const optimization: ValueFactory<`optimization`> = async (
  app: Bud,
) =>
  app.hooks.filter(`build.optimization`, {
    emitOnErrors: app.hooks.filter(`build.optimization.emitOnErrors`),
    minimize: app.hooks.filter(`build.optimization.minimize`),
    minimizer: app.hooks.filter(`build.optimization.minimizer`, [`...`]),
    moduleIds: app.hooks.filter(`build.optimization.moduleIds`),
    runtimeChunk: app.hooks.filter(`build.optimization.runtimeChunk`),
    splitChunks: app.hooks.filter(`build.optimization.splitChunks`),
  })
