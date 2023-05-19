import type {Factory} from './index.js'

export const resolveLoader: Factory<`resolveLoader`> = async ({hooks}) =>
  hooks.filter(`build.resolveLoader`, {
    alias: hooks.filter(`build.resolveLoader.alias`, {}),
  })
