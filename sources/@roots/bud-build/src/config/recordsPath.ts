import type {Factory} from './index.js'

export const recordsPath: Factory<`recordsPath`> = async bud =>
  bud.hooks.filter(
    `build.recordsPath`,
    bud.path(`@storage`, bud.label, `modules.json`),
  )
