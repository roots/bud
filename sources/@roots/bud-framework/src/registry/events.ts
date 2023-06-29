import type {Bud} from '@roots/bud-framework'
import type {MultiStats, Stats} from '@roots/bud-framework/config'

export interface Events {
  boot: [Bud]
  bootstrap: [Bud]
  'build.after': [Bud]
  'build.before': [Bud]
  'compiler.before': [Bud]
  'compiler.done': [Bud, Stats]
  'compiler.error': [Error]
  'compiler.stats': [MultiStats]
  'config.after': [Bud]
  init: [Bud]
  'project.write': [Bud]
  'proxy.interceptor': [Bud]
  register: [Bud]
  registered: [Bud]
  run: [Bud]
  'server.after': [Bud]
  'server.before': [Bud]
  'server.listen': [Bud]
}
