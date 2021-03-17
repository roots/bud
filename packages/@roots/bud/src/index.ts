import './patch'
import './interface'

import {Framework} from '@roots/bud-framework'
import {providers} from './services'
import * as api from '@roots/bud-api'

/**
 * Bud: Build tools
 */
class Bud extends Framework {
  public name = 'bud'
}

const bud: Bud = new Bud({api, providers})
  .bootstrap()
  .register()
  .boot()

export {bud, Bud}
