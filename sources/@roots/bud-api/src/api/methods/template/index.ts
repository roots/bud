import type {Framework} from '@roots/bud-framework'
import {pkgUp} from '@roots/bud-support'
import type {Options as HtmlOptions} from 'html-webpack-plugin'
import {posix as path} from 'path'

import {BudHtmlWebpackPlugin} from './html-webpack-plugin.extension'
import {BudInterpolateHtmlPlugin} from './interpolate-html-plugin.extension'

const {dirname, join} = path

export interface template {
  (userOptions?: Options | boolean): Promise<Framework>
}

export interface facade {
  (userOptions?: Options | boolean): Framework
}

/**
 * Template function options
 *
 * @public
 */
interface Options extends HtmlOptions {
  /**
   * Path to an HTML template to use. If none is supplied
   * one is provided as a default.
   */
  template?: string

  /**
   * Template variable names are used as keys.
   * Each key is associated with a replacement value.
   */
  replace?: {
    [key: string]: string
  }
}

export const template: template = async function (
  userOptions?: Options | boolean,
): Promise<Framework> {
  this as Framework

  if (userOptions === false) {
    this.store.set('features.html', false)
    return this
  }

  this.store.set('features.html', true)

  /**
   * Add {@link BudHtmlWebpackPlugin} if it isn't already added
   */
  if (!this.extensions.has('html-webpack-plugin')) {
    await this.extensions.add(BudHtmlWebpackPlugin)
  }

  /**
   * Add {@link BudInterpolateHtmlPlugin} if it isn't already added
   */
  if (!this.extensions.has('interpolate-html-plugin')) {
    await this.extensions.add(BudInterpolateHtmlPlugin)
  }

  /**
   * If there were no options specified, we're done.
   */
  if (!userOptions || userOptions === true) return this

  /**
   * Plugin references
   */
  const plugins = {
    html: this.extensions.get('html-webpack-plugin'),
    interpolate: this.extensions.get('interpolate-html-plugin'),
  }

  this.info('processing html-webpack-plugin options')
  plugins.html.mergeOptions(userOptions)

  /**
   * If no template is known, provides a default
   */
  if (!plugins.html?.options.has('template')) {
    const manifest = await pkgUp.pkgUp({
      cwd: require.resolve('@roots/bud-support'),
    })

    plugins.html.setOption(
      'template',
      join(dirname(manifest), 'templates/template.html'),
    )
  }

  /**
   * If there were no replacements specified, we're done.
   */
  if (!userOptions.replace) return this

  this.info('processing bud-interpolate-html-plugin options')
  plugins.interpolate.mergeOptions(userOptions.replace)

  return this
}
