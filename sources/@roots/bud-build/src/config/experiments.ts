import type {Factory} from './index.js'

export const experiments: Factory<`experiments`> = async ({
  hooks,
  isDevelopment,
}) =>
  hooks.filter(`build.experiments`, {
    backCompat: false,
    cacheUnaffected: true,
    lazyCompilation: isDevelopment
      ? {entries: false, imports: true}
      : false,
    topLevelAwait: true,
  })
