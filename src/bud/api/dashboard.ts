/**
 * ## bud.dashboard
 *
 * Enable or disable Bud's CLI build output.
 *
 * ```js
 * bud.dashboard(false) // disable dashboard
 * ```
 */
const dashboard = function (enabled: boolean): Bud {
  this.state.features.dashboard = enabled

  return this
}

export {dashboard}
export type Dashboard = (enabled: boolean) => Bud
import type {Bud} from '..'