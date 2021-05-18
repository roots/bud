import './interface'

import {Imagemin, Module} from '@roots/bud-framework'
import * as Plugin from './imagemin'

const name: Module['name'] = '@roots/bud-imagemin'

const imagemin: Imagemin.Config = function (options) {
  this.hooks.on(
    'extension/image-minimizer-webpack-plugin/options',
    () => options,
  )

  return this
}

const extension: Module = {
  name,
  api: {
    imagemin,
  },
  boot: ({extensions}) => extensions.add(Plugin),
}

export {extension as default}
