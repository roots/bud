import {Bud} from './Bud'

import * as args from './args'
import * as containers from './components/containers'
import {extensions} from './components/extensions'
import {items} from './components/items'
import {loaders} from './components/loaders'
import {rules} from './components/rules'

import * as api from '@roots/bud-api'

export const bud: Bud = new Bud(
  {
    containers,
    loaders,
    items,
    rules,
    extensions,
  },
  api,
)
  .init()
  .pipe(Object.values(args))
