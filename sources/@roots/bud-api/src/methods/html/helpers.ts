import type {Options} from '@roots/bud-extensions/html-webpack-plugin'
import type {Bud} from '@roots/bud-framework'

import isObject from '@roots/bud-support/lodash/isObject'
import isUndefined from '@roots/bud-support/lodash/isUndefined'
import omit from '@roots/bud-support/lodash/omit'

import type {Parameters} from './index.js'

export const defaultHtmlPluginOptions = {}

export const getHtmlPluginOptions = (
  bud: Bud,
  options: Parameters[0],
): Omit<Options, `replace`> => {
  if (isUndefined(options) || !isObject(options))
    return defaultHtmlPluginOptions

  if (!isUndefined(options.template))
    options.template = bud.path(options.template)

  return {...omit(options, `replace`)}
}
