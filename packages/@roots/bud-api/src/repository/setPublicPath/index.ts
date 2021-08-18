import {isFunction, isString} from 'lodash'

import type {Repository} from '..'

const setPublicPath: Repository.SetPublicPath = function (
  publicPath,
) {
  isString(publicPath) &&
    this.hooks.on('build/output/publicPath', () => publicPath)

  isFunction(publicPath) &&
    this.hooks.on('build/output/publicPath', publicPath)

  return this
}

export {setPublicPath}
