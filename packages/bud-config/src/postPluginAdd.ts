import Bud from '@roots/bud-types'
import {lodash} from '@roots/bud-support'

const {isArray} = lodash

export const postPluginAdd: Bud.Config.PostPluginAdd = function (
  entry,
) {
  if (isArray(entry)) {
    this.options.set('postcss.plugins', {
      ...this.options.get('postcss.plugins'),
      ...(entry as Bud.Config.PostPluginStore[]),
    })
  } else {
    this.options.set('postcss.plugins', {
      ...this.options.get('postcss.plugins'),
      ...(entry as Bud.Config.PostPluginStore),
    })
  }

  return this
}
