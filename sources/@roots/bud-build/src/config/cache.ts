import type {Factory} from '@roots/bud-build/config'

export const cache: Factory<`cache`> = async ({cache, hooks}) =>
  hooks.filter(`build.cache`, cache.configuration)
