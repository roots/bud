import {Api} from '@roots/bud-api'
import {Cache} from '@roots/bud-cache'
import {Compiler} from '@roots/bud-compiler'
import {Dependencies} from './services/Dependencies'
import {Discovery} from './services/Discovery'
import {Env} from './services/Env'
import {Extensions} from './services/Extensions'
import {Hooks} from './services/Hooks'
import {Logger} from './services/Logger'
import {Server} from './services/Server'
import {Build} from '@roots/bud-build'
import {Framework, Configuration} from '@roots/bud-framework'

class Bud extends Framework {
  public implementation: new (options: {
    name?: string
    mode?: 'production' | 'development'
    config?: Configuration
    parent?: Framework
  }) => Framework = Bud

  public api: Api

  public build: Build

  public cache: Cache

  public compiler: Compiler

  public dependencies: Dependencies

  public discovery: Discovery

  public env: Env

  public extensions: Extensions

  public hooks: Hooks

  public logger: Logger

  public server: Server
}

export {Bud}
