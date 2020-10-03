import {Config} from '..'
import {lodash} from '@roots/bud-support'

const {isArray} = lodash

export const postPluginAdd: Config.PostPluginAdd = function (
  entry,
) {
  if (isArray(entry)) {
    this.store['postcss'].set('plugins', {
      ...this.store['postcss'].get('plugins'),
      ...(entry as Config.PostPluginStore[]),
    })
  } else {
    this.store['postcss'].set('plugins', {
      ...this.store['postcss'].get('plugins'),
      ...(entry as Config.PostPluginStore),
    })
  }

  return this
}
