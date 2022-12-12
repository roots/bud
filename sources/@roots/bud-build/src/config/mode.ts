import type {Factory} from './index.js'

export const mode: Factory<`mode`> = async bud =>
  bud.hooks.filter(`build.mode`, bud.mode)
