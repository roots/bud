import {Bud} from './Bud'

import * as api from '@roots/bud-api'
import * as args from './args'
import * as components from './components'
import {presets} from './presets'
import {services} from './services'

export const bud: Bud = new Bud({
  api,
  components,
  presets,
  services,
})
  .init()
  .pipe(Object.values(args))

export {Bud}
