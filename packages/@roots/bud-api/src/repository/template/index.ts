import {isUndefined} from 'lodash'

import type Repository from '..'
import * as HtmlWebpackPlugin from './HtmlWebpackPlugin'
import * as InterpolateHtmlPlugin from './InterpolateHtmlPlugin'

const template: Repository.Template = function (userOptions) {
  /**
   * Add the html-webpack-plugin extension if it isn't already added
   */
  !this.extensions.has('html-webpack-plugin') &&
    this.extensions.add(HtmlWebpackPlugin)

  /**
   * Add the interpolate-html-plugin extension if it isn't already added
   */
  !this.extensions.has('interpolate-html-plugin') &&
    this.extensions.add(InterpolateHtmlPlugin)

  /**
   * Set feature flag to true
   */
  this.store.set(
    'html',
    isUndefined(userOptions?.enabled) ||
      userOptions.enabled === true,
  )

  /**
   * This isn't an option for either html-webpack-plugin or interpolate-html-plugin
   * so we'll just delete it.
   */
  !isUndefined(userOptions?.enabled) &&
    delete userOptions.enabled

  /**
   * If there were no options specified, we're done.
   */
  if (!userOptions) return this

  /**
   * Set html-webpack-plugin options
   */
  const htmlPlugin = this.extensions.get('html-webpack-plugin')
  htmlPlugin.set('options', {
    ...htmlPlugin.options,
    ...userOptions,
  })

  /**
   * If there are no template vars specified, we're done
   */
  if (!userOptions.replace) return this

  /**
   * Set interpolate-html-plugin options
   */
  const interpolatePlugin = this.extensions.get(
    'interpolate-html-plugin',
  )
  interpolatePlugin.set('options', {
    ...interpolatePlugin.options,
    ...userOptions.replace,
  })

  return this
}

/**
 * @exports template
 */
export {template}
