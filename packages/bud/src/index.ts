import Bud from './Bud'

import {extensions} from './extensions'
import {items} from './items'
import {loaders} from './loaders'
import {services} from './services'
import * as api from '@roots/bud-api'
import * as containers from './containers'
import * as rules from './rules'
import * as args from './args'

const bud: Bud = new Bud({
  api,
  containers,
  extensions,
  items,
  loaders,
  rules,
  services,
})
  .init()
  .pipe(Object.values(args))

export {bud}
export type {Bud}
