import type {Bud} from '../bud.js'
import type {Modules} from './modules.js'

export interface Events {
  'app.close': (app?: Bud) => any
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
  [
    key: `${keyof Modules & string}/${
      | 'init'
      | 'register'
      | 'boot'
      | 'beforeBuild'
      | 'afterConfig'
      | 'make'}/${'before' | 'after'}`
  ]: (app?: Bud) => Promise<unknown>
}

export namespace Events {
  export type HookMap = {
    [K in keyof Events as `${K & string}`]: Events[K]
  }
}
