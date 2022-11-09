import type {Bud} from '../../bud.js'

export interface Events {
  init: (app?: Bud) => Promise<unknown>
  bootstrap: (app?: Bud) => Promise<unknown>
  bootstrapped: (app?: Bud) => Promise<unknown>
  register: (app?: Bud) => Promise<unknown>
  registered: (app?: Bud) => Promise<unknown>
  boot: (app?: Bud) => Promise<unknown>
  booted: (app?: Bud) => Promise<unknown>
  'build.before': (app?: Bud) => Promise<unknown>
  'build.after': (app?: Bud) => Promise<unknown>
  'compiler.before': (app?: Bud) => Promise<unknown>
  'compiler.after': (app?: Bud) => Promise<unknown>
  'compiler.close': (app?: Bud) => Promise<unknown>
  'compiler.success': (app?: Bud) => Promise<unknown>
  'compiler.error': (app?: Bud) => Promise<unknown>
  'project.write': (app?: Bud) => Promise<unknown>
  'config.after': (app?: Bud) => Promise<unknown>
  run: (app?: Bud) => Promise<unknown>
  'server.before': (app?: Bud) => Promise<unknown>
  'server.listen': (app?: Bud) => Promise<unknown>
  'server.after': (app?: Bud) => Promise<unknown>
  'proxy.interceptor': (app?: Bud) => Promise<unknown>
}

export type Registry = {
  [P in keyof Events as `${P & string}`]: Events[P]
}
