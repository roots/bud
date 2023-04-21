import type {Factory} from './index.js'

export const resolveLoader: Factory<`resolveLoader`> = async bud =>
  bud.hooks.filter(`build.resolveLoader`, {
    alias: {},
  })
