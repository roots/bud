import type {Factory} from './index.js'

export const recordsPath: Factory<`recordsPath`> = async bud =>
  bud.hooks.filter(
    `build.recordsPath`,
    bud.path(`@os-cache`, bud.label, `modules.json`),
  )
