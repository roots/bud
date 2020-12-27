import Bud from './Bud'

import * as api from '@roots/bud-api'
import * as args from './args'
import * as components from './components'
import * as containers from './containers'
import {services} from './services'

const bud: Bud = new Bud({
  api,
  containers,
  services,
  ...components,
})
  .init()
  .pipe(Object.values(args))

export {bud}
export type {Bud}
