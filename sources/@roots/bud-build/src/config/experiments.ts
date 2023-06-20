import type {Factory} from './index.js'

export const experiments: Factory<`experiments`> = async ({
  hooks,
  isDevelopment,
}) =>
  hooks.filter(`build.experiments`, {
    backCompat: false,
    lazyCompilation: {
      entries: false,
      imports: isDevelopment,
    },
  })
