import type {Factory} from './index.js'

export const experiments: Factory<`experiments`> = async ({hooks}) =>
  hooks.filter(`build.experiments`, undefined)
