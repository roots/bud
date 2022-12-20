import type {Factory} from './index.js'

export const stats: Factory<`stats`> = async app =>
  app.hooks.filter(
    `build.stats`,
    app.isProduction
      ? {
          all: false,
          assets: true,
          children: false,
          entrypoints: true,
          errors: true,
          errorsCount: true,
          hash: true,
          outputPath: true,
          modules: true,
          timings: true,
          warnings: true,
          warningsCount: true,
        }
      : {preset: `none`},
  )
