import '@roots/bud-framework'
import '@roots/bud-typescript'

import {Bud} from '@roots/bud'

export default async (bud: Bud) => {
  bud.entry({app: ['app']}).template()
}
