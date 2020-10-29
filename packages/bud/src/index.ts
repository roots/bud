import {Bud} from '@roots/bud-framework'

import * as api from '@roots/bud-api'
import * as containers from './containers'
import * as plugins from './plugins'

import {builders} from './builders'
import {services} from './services'

/**
 * Instantiate Bud.
 */
const bud: Framework.Bud = new Bud({
  api,
  builders,
  containers,
  plugins,
  services,
})

export default bud
module.exports = bud
