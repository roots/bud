import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

import type {Bud} from '@roots/bud-framework'
import type * as HTMLWebpackPlugin from '@roots/bud-support/html-webpack-plugin'
import isObject from '@roots/bud-support/lodash/isObject'
import isUndefined from '@roots/bud-support/lodash/isUndefined'
import omit from '@roots/bud-support/lodash/omit'

import type {Parameters} from './index.js'
import type * as InterpolateHTMLExtension from './interpolate-html-webpack-plugin/index.js'

export const defaultHtmlPluginOptions = {
  template: resolve(
    dirname(fileURLToPath(import.meta.url)),
    `..`,
    `..`,
    `..`,
    `vendor`,
    `template.html`,
  ),
}

export const getHtmlPluginOptions = (
  bud: Bud,
  options: Parameters[0],
): Omit<HTMLWebpackPlugin.Options, `replace`> => {
  if (isUndefined(options) || !isObject(options))
    return defaultHtmlPluginOptions

  const template = isUndefined(options.template)
    ? defaultHtmlPluginOptions.template
    : bud.path(options.template)

  return {template, ...omit(options, `replace`, `template`)}
}

export const getInterpolatePluginOptions = (
  bud: Bud,
  options: Parameters[0],
): InterpolateHTMLExtension.Options => {
  if (
    !isObject(options) ||
    isUndefined(options) ||
    isUndefined(options.replace)
  ) {
    return bud.env.getPublicEnv()
  }

  return {...bud.env.getPublicEnv(), ...options.replace}
}
