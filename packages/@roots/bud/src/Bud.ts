import {Framework} from '@roots/bud-framework'
import {Cache} from '@roots/bud-cache'
import {Compiler} from '@roots/bud-compiler'
import {Dependencies} from './services/Dependencies/index'
import {Discovery} from './services/Discovery/index'
import {Disk} from './services/Disk/index'
import {Env} from './services/Env/index'
import {Extensions} from './services/Extensions/index'
import {Hooks} from './services/Hooks/index'
import {Logger} from './services/Logger/index'
import {Server} from './services/Server/index'

class Bud extends Framework {
  public cache: Cache

  public compiler: Compiler

  public dependencies: Dependencies

  public discovery: Discovery

  public disk: Disk

  public env: Env

  public extensions: Extensions

  public hooks: Hooks

  public logger: Logger

  public server: Server
}

/**
 * @exports Bud      Class definition
 * @exports services Default services
 */
export {Bud}
