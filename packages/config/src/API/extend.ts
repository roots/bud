import {isArray} from 'lodash'

export const extend: API.Extend = function (plugins) {
  if (!isArray(plugins)) {
    return
  }

  // plugins.map(plugin => this.store['extensions'].set(this.makeExtension(plugin))

  return this
}
