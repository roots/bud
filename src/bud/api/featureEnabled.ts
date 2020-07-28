import type {Bud} from './types'

/**
 * ## bud.featureEnabled
 *
 * Return a boolean representing if a feature is enabled.
 *
 * ```js
 * bud.featureEnabled('eslint')
 * // returns true if eslint enabled
 * ```
 */
const featureEnabled = function (
  this: Bud,
  feature: string,
): boolean {
  return this.state.features[feature] === true
}

export {featureEnabled}
