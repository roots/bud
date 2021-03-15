import './patch'
import './interface'

import {providers} from './providers'
import {Framework} from '@roots/bud-framework'
import * as api from '@roots/bud-api'

class Bud extends Framework {}

const mode =
  process.argv.includes('development') ||
  process.argv.includes('dev')
    ? 'development'
    : 'production'

const bud: Bud = new Bud({api, mode, providers})
  .bootstrap()
  .register()
  .boot()

export {bud, Bud}
