import type Api from '@roots/bud-api'
import type Build from '@roots/bud-build'
import type Cache from '@roots/bud-cache'
import type Compiler from '@roots/bud-compiler'
import type Extensions from '@roots/bud-extensions'
import * as Framework from '@roots/bud-framework'
import type Hooks from '@roots/bud-hooks'
import type Server from '@roots/bud-server'

/**
 * ## ⚡️ Bud
 *
 * - {@link https://bud.js.org/guides/configure Configuration guide}
 *
 * @public
 */
class Bud extends Framework.Bud {
  public override implementation = Bud

  public declare api: Api

  public declare build: Build

  public declare cache: Cache

  public declare compiler: Compiler

  public declare extensions: Extensions

  public declare hooks: Hooks

  public declare server: Server
}

export {Bud}
