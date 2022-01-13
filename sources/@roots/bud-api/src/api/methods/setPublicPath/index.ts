import type {Framework} from '@roots/bud-framework'

import {isFunction, isString} from './setPublicPath.dependencies'

export interface setPublicPath {
  (publicPath: string | ((publicPath: string) => string)): Framework
}

export const setPublicPath: setPublicPath = function (publicPath) {
  this as Framework

  isString(publicPath) &&
    this.hooks.on('build.output.publicPath', () => publicPath)

  isFunction(publicPath) &&
    this.hooks.on('build.output.publicPath', publicPath)

  return this
}
