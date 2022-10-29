import type Api from '@roots/bud-api'
import type Build from '@roots/bud-build'
import type Extensions from '@roots/bud-extensions'
import {Bud as Core} from '@roots/bud-framework/bud'

/**
 * ⚡️ Bud
 *
 * @public
 */
export default class Bud extends Core {
  public implementation = Bud
  public declare api: Api
  public declare build: Build
  public declare extensions: Extensions
}
