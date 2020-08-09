import type {Bud, Extension, ExtensionInterface} from '@roots/bud'
import * as dependencyExtractionExtension from '@roots/bud-dependency-extraction'
import * as sassExtension from '@roots/bud-sass'
import {eslint as eslintExtension} from '@roots/bud-eslint'
import {stylelint as stylelintExtension} from '@roots/bud-stylelint'
import {purgecss as purgecssExtension, presets} from '@roots/bud-purgecss'

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
  (
    this: Bud,
    options?: {
      purge: boolean
      eslint: boolean
      stylelint: boolean
      extraction: boolean
      sass: boolean
    },
  ): Bud
}

const config: Sage = function (
  this: Bud,
  options?: {
    purge: boolean
    eslint: boolean
    stylelint: boolean
    extraction: boolean
    sass: boolean
  },
) {
  const enabledPlugins: any[] = []

  options?.purge !== false && enabledPlugins.push(purgecssExtension)
  options?.eslint !== false && enabledPlugins.push(eslintExtension)
  options?.stylelint !== false && enabledPlugins.push(stylelintExtension)
  options?.extraction !== false && enabledPlugins.push(dependencyExtractionExtension)
  options?.sass !== false && enabledPlugins.push(sassExtension)

  this.use(enabledPlugins)

  options?.purge !== false &&
    this.purgecss({
      enabled: this.bud.inProduction,
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
const sage: Extension = () => ({
  make: function (this: ExtensionInterface): void {
    if (this.bud) {
      this.bud.sage = config

      this.bud
        .babel(this.bud.presets.get('babel-wp').config)
        .postCss(this.bud.presets.get('postCss').config)
        .inlineManifest()
        .mini(this.bud.inProduction)
        .map(this.bud.inDevelopment)
        .hash(this.bud.inProduction)
        .vendor()
    }
  },
})

module.exports = sage
