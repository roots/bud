import {bud} from '@roots/bud'
import type {Bud, Extension} from '@roots/bud'
import {extraction as extractionExtension} from '@roots/bud-dependency-extraction-webpack-plugin'
import {sass as sassExtension} from '@roots/bud-sass'
import {eslint as eslintExtension} from '@roots/bud-eslint'
import {stylelint as stylelintExtension} from '@roots/bud-stylelint'
import {
  purgecss as purgecssExtension,
  presets,
} from '@roots/bud-purgecss'

/**
 * Available features.
 */
type FeatureKey =
  | 'purge'
  | 'eslint'
  | 'stylelint'
  | 'extraction'
  | 'sass'

/**
 * Map features to their extensions
 */
interface Features {
  [key: string]: Extension
}

interface Enabled {
  key: FeatureKey
  value: boolean
}

/**
 * ## bud.sage
 *
 * Customize the features used in your theme.
 *
 * ```js
 * bud.sage({
 *  purge: false,
 * })
 */
interface Sage extends Bud {
  purgecss: any
  sass: any
  withFeatures: any
}

interface WithFeatures {
  (this: Sage, enabled: Enabled): Sage
}

const features: Features = {
  purgecss: purgecssExtension,
  eslint: eslintExtension,
  stylelint: stylelintExtension,
  extraction: extractionExtension,
  sass: sassExtension,
}

const withFeatures: WithFeatures = function (options): Sage {
  const enabled: Extension[] = []

  options
    ? Object.entries(features).forEach(([feature, extension]) => {
        const isEnabled =
          !options ||
          !options.hasOwnProperty(feature) ||
          options[feature] !== false

        isEnabled && enabled.push(extension)
      })
    : Object.values(features).forEach(feature => {
        enabled.push(feature)
      })

  this.use(enabled)

  enabled.includes(purgecssExtension) &&
    this.purgecss({
      enabled: this.inProduction,
      options: {
        ...presets.wordpress,
      },
    })

  return this
}

/**
 * @roots/bud-sage
 *
 * Preset configuration for Sage projects
 */
const sage = (() => {
  bud.apply('withFeatures', withFeatures)

  bud
    .srcPath('resources/assets')
    .distPath('dist')
    .alias({
      '@fonts': bud.src('fonts'),
      '@images': bud.src('images'),
      '@scripts': bud.src('scripts'),
      '@styles': bud.src('styles'),
    })
    .auto({
      jquery: ['$', 'window.jQuery'],
    })
    .runtimeManifest()
    .mini(bud.inProduction)
    .map(bud.inDevelopment)
    .hash(bud.inProduction)
    .vendor()

  return bud
})()

export {sage}
export {WithFeatures, FeatureKey, Features, Enabled}
