import type {Bud} from '@roots/bud-framework'
import type {StatsCompilation} from '@roots/bud-framework/config'

export interface Events {
  boot: [Bud]
  bootstrap: [Bud]
  'build.after': [Bud]
  'build.before': [Bud]
  'compiler.before': [Bud]
  'compiler.done': [Bud, StatsCompilation]
  'config.after': [Bud]
  'config.before': [Bud]
  register: [Bud]
  'server.after': [Bud]
  'server.before': [Bud]
}
