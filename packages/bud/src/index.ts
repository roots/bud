import Bud from './Bud'

import * as api from '@roots/bud-api'
import * as args from './args'
import * as components from './components'
import * as containers from './containers'
import {presets} from './presets'
import {services} from './services'

export const bud: Bud = new Bud({
  api,
  components,
  containers,
  presets,
  services,
})
  .init()
  .pipe(Object.values(args))

export {Bud}
