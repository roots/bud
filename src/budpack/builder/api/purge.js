import {isBoolean} from 'lodash'
import {object} from 'prop-types'

/**
 * Purge unused CSS from compiled stylesheets.
 * @see https://purgecss.com/guides/wordpress.html
 * @see https://purgecss.com/configuration.html
 * @example
 * bud.purge({
 *   enabled: bud.inProduction,
 *   content: [bud.project('resources/views/**')],
 *   allow: require('purgecss-with-wordpress').whitelist,
 *   allowPatterns: require('purgecss-with-wordpress').whitelistPatterns,
 * })
 * @typedef {function ({enabled: boolean, content: Object, css: Object, defaultExtractor?: Function, extractors?: array, fontFace: boolean, keyframes: boolean, output: string, rejected: boolean, stdin?: boolean, stdout?: boolean, variables?: boolean, whitelist?: string[], whitelistPatterns?: RegExp[], whitelistPatternsChildren?: RegExp[] }) => {bud: import('./../index')}} purge
 * @param   {{enabled: boolean, content: Object, css: Object, defaultExtractor?: Function, extractors?: array, fontFace: boolean, keyframes: boolean, output: string, rejected: boolean, stdin?: boolean, stdout?: boolean, variables?: boolean, whitelist?: string[], whitelistPatterns?: RegExp[], whitelistPatternsChildren?: RegExp[] }} options - purge options
 * @param   {boolean}  options.enabled - true to enable purgecss
 * @param   {Object}   options.content
 * @param   {Object}   options.css
 * @param   {Function} options.defaultExtractor
 * @param   {Array}    options.extractors
 * @param   {boolean}  options.fontFace
 * @param   {boolean}  options.keyframes
 * @param   {string}   options.output
 * @param   {boolean}  options.rejected
 * @param   {boolean}  options.stdin
 * @param   {boolean}  options.stdout
 * @param   {boolean}  options.variables
 * @param   {string}   options.whitelist
 * @param   {RegExp[]} options.whitelistPatterns
 * @param   {RegExp[]} options.whitelistPatternsChildren
 * @return  {import('./../index')} bud
 */
const purge = function (options) {
  isBoolean(options.enabled) &&
    delete options.enabled &&
    Object.assign(this.features.purge, options.enabled)

  this.features.purge &&
    (() => {
      this.options.postCss = {
        ...this.options.postCss,
        plugins: [
          ...this.options.postCss.plugins,
          require('@fullhuman/postcss-purgecss')({
            ...options,
          }),
        ],
      }
    })()

  return this
}

export {purge}
