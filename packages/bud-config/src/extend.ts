import Bud from '@roots/bud-types'
import {isArray} from 'lodash'

export const extend: Bud.Config.Extend = function (plugins) {
  if (!isArray(plugins)) {
    return
  }

  plugins.map(plugin => this.makePluginController(plugin).make())

  return this
}
