import type {MultiStats} from '@roots/bud-support/webpack'

import type {Bud} from '../../bud.js'

export interface Events {
  init: Bud
  bootstrap: Bud
  bootstrapped: Bud
  register: Bud
  registered: Bud
  boot: Bud
  booted: Bud
  'build.before': Bud
  'build.after': Bud
  'compiler.before': Bud
  'compiler.after': Bud
  'compiler.close': Bud
  'compiler.stats': MultiStats
  'compiler.error': Error
  'project.write': Bud
  'config.after': Bud
  run: Bud
  'server.before': Bud
  'server.listen': Bud
  'server.after': Bud
  'proxy.interceptor': Bud
}
