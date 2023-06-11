import type {Bud} from '../../index.js'
import type {Compilation, MultiStats} from '../config/index.js'

export interface Events {
  boot: Bud
  booted: Bud
  bootstrap: Bud
  bootstrapped: Bud
  'build.after': Bud
  'build.before': Bud
  'compilation.afterEmit': Compilation
  'compiler.after': Bud
  'compiler.before': Bud
  'compiler.close': Bud
  'compiler.error': Error
  'compiler.stats': MultiStats
  'config.after': Bud
  init: Bud
  'project.write': Bud
  'proxy.interceptor': Bud
  register: Bud
  registered: Bud
  run: Bud
  'server.after': Bud
  'server.before': Bud
  'server.listen': Bud
}
