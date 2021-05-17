import {Api} from '@roots/bud-api'
import {Cache} from '@roots/bud-cache'
import {Compiler} from '@roots/bud-compiler'
import {Dependencies} from './services/Dependencies'
import {Discovery} from './services/Discovery'
import {Disk} from './services/Disk'
import {Env} from './services/Env'
import {Extensions} from './services/Extensions'
import {Hooks} from './services/Hooks'
import {Logger} from './services/Logger'
import {Server} from './services/Server'
import {Build} from '@roots/bud-build'
import {Framework} from '@roots/bud-framework'

class Bud extends Framework {
  api: Api

  build: Build

  cache: Cache

  compiler: Compiler

  dependencies: Dependencies

  discovery: Discovery

  disk: Disk

  env: Env

  extensions: Extensions

  hooks: Hooks

  logger: Logger

  server: Server
}

export {Bud}
