import type {Bud} from '@roots/bud-framework'
import type {MultiStats, Stats} from '@roots/bud-framework/config'

export interface Events {
  boot: [Bud]
  bootstrap: [Bud]
  'build.after': [Bud]
  'build.before': [Bud]
  'compiler.before': [Bud]
  'compiler.done': [Bud, MultiStats & Stats]
  'config.after': [Bud]
  register: [Bud]
  'server.after': [Bud]
  'server.before': [Bud]
}
