import type {Factory} from './index.js'

export const cache: Factory<`cache`> = async ({cache, hooks}) =>
  hooks.filter(`build.cache`, cache.configuration)
