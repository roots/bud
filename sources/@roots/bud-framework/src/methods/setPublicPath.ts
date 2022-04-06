import {lodash} from '@roots/bud-support'

import type {Bud} from '..'

const {isFunction, isString} = lodash

/**
 * @public
 */
export interface setPublicPath {
  (publicPath: string | ((publicPath: string) => string)): Bud
}

/**
 * @public
 */
export const setPublicPath: setPublicPath = function (publicPath) {
  this as Bud

  isString(publicPath) &&
    this.hooks.on('build.output.publicPath', () => publicPath)

  isFunction(publicPath) &&
    this.hooks.on('build.output.publicPath', publicPath)

  return this
}
