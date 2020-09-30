import Bud from '@roots/bud-types'
import {lodash} from '@roots/bud-support'

const {isArray} = lodash

export const postPluginAdd: Bud.Config.PostPluginAdd = function (
  entry,
) {
  if (isArray(entry)) {
    this.store['postcss'].set('plugins', {
      ...this.store['postcss'].get('plugins'),
      ...(entry as Bud.Config.PostPluginStore[]),
    })
  } else {
    this.store['postcss'].set('plugins', {
      ...this.store['postcss'].get('plugins'),
      ...(entry as Bud.Config.PostPluginStore),
    })
  }

  return this
}
