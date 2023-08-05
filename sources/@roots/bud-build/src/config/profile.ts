import type {Factory} from '@roots/bud-build/config'

export const profile: Factory<`profile`> = async bud =>
  bud.hooks.filter(`build.profile`, bud.context.debug)
