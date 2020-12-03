import {Bud} from './Bud'

import * as args from './args'
import * as containers from './components/containers'
import {extensions} from './components/extensions'
import {items} from './components/items'
import {loaders} from './components/loaders'
import {rules} from './components/rules'

export const bud: Bud = new Bud({
  containers,
  loaders,
  items,
  rules,
  extensions,
})
  .init()
  .pipe(Object.values(args))
