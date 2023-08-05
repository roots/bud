import type {Factory} from '@roots/bud-build/config'

export const recordsPath: Factory<`recordsPath`> = async bud =>
  bud.hooks.filter(
    `build.recordsPath`,
    bud.path(`@storage`, bud.label, `modules.json`),
  )
