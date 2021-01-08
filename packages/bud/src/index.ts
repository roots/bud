import Bud from './Bud'
import {Framework} from '@roots/bud-typings'
import {services} from './services'
import {store} from './store'
import * as api from '@roots/bud-api'
import * as args from './args'

const bud: Framework & Bud = new Bud({
  api,
  store,
  services,
})
  .init()
  .pipe(Object.values(args))

export {bud}
export type {Bud}
