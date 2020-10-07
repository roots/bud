import {lodash} from '@roots/bud-support'

const {isArray} = lodash

export const postPluginAdd: API.PostPluginAdd = function (
  entry,
) {
  if (isArray(entry)) {
    this.store['postcss'].set('plugins', {
      ...this.store['postcss'].get('plugins'),
      ...(entry as API.PostPluginStore[]),
    })
  } else {
    this.store['postcss'].set('plugins', {
      ...this.store['postcss'].get('plugins'),
      ...(entry as API.PostPluginStore),
    })
  }

  return this
}
