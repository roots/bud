import type Api from '@roots/bud-api'
import type Build from '@roots/bud-build'
import type Cache from '@roots/bud-cache'
import type Compiler from '@roots/bud-compiler'
import type Dashboard from '@roots/bud-dashboard'
import type Extensions from '@roots/bud-extensions'
import type Hooks from '@roots/bud-hooks'
import type Server from '@roots/bud-server'

import {Service, ServiceContainer} from '@roots/bud-framework'
import {Bud as Framework} from '@roots/bud-framework'

/**
 * ## ⚡️ Bud
 *
 * {@link https://bud.js.org/ bud.js}
 */
class Bud extends Framework {
  public declare api: Api

  public declare build: Build

  public declare cache: Cache

  public declare compiler: Compiler

  public declare dashboard: Dashboard

  public declare extensions: Extensions

  public declare hooks: Hooks

  public override implementation = Bud as any

  public declare server: Server
}

export default Bud
export {Service, ServiceContainer}
