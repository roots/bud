import type {Bud, Dashboard} from './types'

/**
 * ## bud.features
 *
 * Enable or disable Bud's CLI build output.
 *
 * ```js
 * bud.dashboard(false) // disable dashboard
 * ```
 */
const features = function (this: Bud, features: any) {
  this.state.features = {
    ...this.state.features,
    ...features,
  }

  return this
}

export {features}
