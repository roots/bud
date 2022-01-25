import {lodash} from '@roots/bud-support'

import type {Framework} from '..'

const {isFunction, isString} = lodash

/**
 * @public
 */
export interface setPublicPath {
  (publicPath: string | ((publicPath: string) => string)): Framework
}

/**
 * @public
 */
export const setPublicPath: setPublicPath = function (publicPath) {
  this as Framework

  isString(publicPath) &&
    this.hooks.on('build.output.publicPath', () => publicPath)

  isFunction(publicPath) &&
    this.hooks.on('build.output.publicPath', publicPath)

  return this
}
