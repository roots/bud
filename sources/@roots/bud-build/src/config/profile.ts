import type {Factory} from './index.js'

export const profile: Factory<`profile`> = async bud =>
  bud.hooks.filter(
    `build.profile`,
    bud.isCLI() && bud.context.args[`debug`],
  )
