import type {ValueFactory} from './builder'

export const experiments: ValueFactory<`experiments`> = async app =>
  app.hooks.filter(`build.experiments`, {
    asyncWebAssembly: app.hooks.filter(
      `build.experiments.asyncWebAssembly`,
    ),
    backCompat: app.hooks.filter(`build.experiments.backCompat`),
    buildHttp: app.hooks.filter(`build.experiments.buildHttp`),
    cacheUnaffected: app.hooks.filter(`build.experiments.cacheUnaffected`),
    css: app.hooks.filter(`build.experiments.css`),
    futureDefaults: app.hooks.filter(`build.experiments.futureDefaults`),
    layers: app.hooks.filter(`build.experiments.layers`),
    lazyCompilation: app.hooks.filter(`build.experiments.lazyCompilation`),
    topLevelAwait: app.hooks.filter(`build.experiments.topLevelAwait`),
    outputModule: app.hooks.filter(`build.experiments.outputModule`),
    syncWebAssembly: app.hooks.filter(`build.experiments.syncWebAssembly`),
  })
