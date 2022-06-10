import {addFilter, removeFilter} from '@wordpress/hooks'
import {registerPlugin, unregisterPlugin} from '@wordpress/plugins'

import * as editor from './editor.js'

export const register = ({name, settings, filters}) => {
  registerPlugin(name, settings)

  filters?.forEach(({hook, namespace, callback}) => {
    addFilter(hook, namespace, callback)
  })
}

export const unregister = ({name, filters}) => {
  unregisterPlugin(name)

  filters?.forEach(({hook, namespace}) => {
    removeFilter(hook, namespace)
  })
}

export const load = (getContext, callback) =>
  editor.load({
    getContext,
    callback,
    register,
    unregister,
  })
