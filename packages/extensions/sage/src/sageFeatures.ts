import Bud from '@roots/bud-types'
import sass from '@roots/bud-sass'
import {plugin as eslint} from '@roots/bud-eslint'
import {plugin as stylelint} from '@roots/bud-stylelint'
import {
  plugin as purgecss,
  preset as purgePreset,
} from '@roots/bud-purgecss'

import {Sage} from '.'

/**
 * Bud extensions consumed by the Sage preset.
 */
type SageFeature =
  | typeof purgecss
  | typeof eslint
  | typeof stylelint
  | typeof sass

/**
 * Feature specification.
 *
 * @example {purgecss: false}
 */
export interface FeatureOption {
  key: SageFeature
  value: boolean
}

/**
 * User-specified featureset.
 */
export type SelectFeatures = FeatureOption[]

/**
 * ## Configure theme features.
 *
 * Customize the features used in your theme.
 */
const sageFeatures = function (
  this: Sage,
  features: SelectFeatures,
): Sage {
  /**
   * Available feature plugins.
   */
  const featureSet: Bud.Plugin.Factory[] = [
    purgecss,
    eslint,
    stylelint,
    sass,
  ]

  /**
   * Enabled features
   */
  const enabledFeatures: Bud.Plugin.Factory[] = []

  /**
   * If user didn't specify anything, enable all features.
   */
  if (!features) {
    featureSet.forEach(feature => {
      enabledFeatures.push(feature)
    })
  } else {
    /**
     * Enable each specified feature.
     */
    Object.entries(featureSet).forEach(([feature, plugin]) => {
      const isEnabled =
        !features ||
        !features.hasOwnProperty(feature) ||
        features[feature] !== false

      isEnabled && enabledFeatures.push(plugin)
    })
  }

  /**
   * Register the enabled features with the application.
   */
  this.extend(enabledFeatures)

  /**
   * If purgecss is enabled and we're running in production then
   * apply purgecss rules to the stylesheet assets.
   */
  this.when(
    this.mode.is('production') &&
      enabledFeatures.includes(purgecss),
    this.purgecss({
      options: purgePreset,
    }),
    () => null,
  )

  /**
   * Return Sage config instance for chaining.
   */
  return this
}

export {sageFeatures as default}
