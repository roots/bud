import type {Factory} from '@roots/bud-build/config'

export const mode: Factory<`mode`> = async bud =>
  bud.hooks.filter(`build.mode`, bud.mode)
