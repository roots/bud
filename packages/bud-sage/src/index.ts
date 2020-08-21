import type {Bud, Extension, ExtensionInterface} from '@roots/bud'
import {extraction as extractionExtension} from '@roots/bud-dependency-extraction'
import {sass as sassExtension} from '@roots/bud-sass'
import {eslint as eslintExtension} from '@roots/bud-eslint'
import {stylelint as stylelintExtension} from '@roots/bud-stylelint'
import {purgecss as purgecssExtension, presets} from '@roots/bud-purgecss'

/**
 * Available features.
 */
type FeatureKey = 'purge' | 'eslint' | 'stylelint' | 'extraction' | 'sass'

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
interface Sage {
  (this: Bud, enabled: Enabled): Bud
}

const features: Features = {
  purge: purgecssExtension,
  eslint: eslintExtension,
  stylelint: stylelintExtension,
  extraction: extractionExtension,
  sass: sassExtension,
}

const withFeatures: Sage = function (options): Bud {
  const enabled: Extension[] = []

  options
    ? Object.entries(features).forEach(([feature, extension]) => {
        const isEnabled =
          !options || !options.hasOwnProperty(feature) || options[feature] !== false

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
const sage: Extension = (bud: Bud): ExtensionInterface => ({
  bud,
  make: function (this: ExtensionInterface): void {
    this.bud.withFeatures = withFeatures

    this.bud
      .srcPath('resources/assets')
      .distPath('dist')
      .alias({
        '@fonts': this.bud.src('fonts'),
        '@images': this.bud.src('images'),
        '@scripts': this.bud.src('scripts'),
        '@styles': this.bud.src('styles'),
      })
      .auto({
        jquery: ['$', 'window.jQuery'],
      })
      .runtimeManifest()
      .mini(this.bud.inProduction)
      .map(this.bud.inDevelopment)
      .hash(this.bud.inProduction)
      .vendor()
  },
})

export {sage}
export {Sage, FeatureKey, Features, Enabled}
