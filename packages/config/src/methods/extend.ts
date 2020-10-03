import {Config} from '..'
import {isArray} from 'lodash'

export const extend: Config.Extend = function (plugins) {
  if (!isArray(plugins)) {
    return
  }

  // plugins.map(plugin => this.store['extensions'].set(this.makeExtension(plugin))

  return this
}
