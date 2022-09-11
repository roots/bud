import type Api from '@roots/bud-api'
import * as Framework from '@roots/bud-framework'
import type Hooks from '@roots/bud-hooks'

/**
 * ⚡️ Bud
 *
 * @public
 */
export default class Bud extends Framework.Bud {
  public declare api: Api
  public declare hooks: Hooks
  public implementation = Bud
}
