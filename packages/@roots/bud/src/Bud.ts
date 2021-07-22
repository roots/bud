/**
 * @module @roots/bud
 */

import type {Api} from '@roots/bud-api'
import type {Build} from '@roots/bud-build'
import type {Cache} from '@roots/bud-cache'
import type {Compiler} from '@roots/bud-compiler'
import {Framework} from '@roots/bud-framework'

import type {Dependencies} from './services/Dependencies'
import type {Discovery} from './services/Discovery'
import type {Env} from './services/Env'
import type {Extensions} from './services/Extensions'
import type {Hooks} from './services/Hooks'
import type {Logger} from './services/Logger'
import type {Server} from './services/Server'

/**
 * @class Bud
 */
export class Bud extends Framework {
  public implementation: Framework.Constructor

  public constructor(options: Framework.Options) {
    super(options)

    this.implementation = Bud
  }

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
