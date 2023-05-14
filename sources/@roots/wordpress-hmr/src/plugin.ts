import type {WPPlugin} from '@wordpress/plugins'
import {
  getPlugins,
  registerPlugin,
  unregisterPlugin,
} from '@wordpress/plugins'

import type * as Filter from './filter.js'
import {filterCallback} from './utility.js'

export interface Props extends WPPlugin {
  name: string
  filters?: Filter.KeyedFilters
  settings: Omit<WPPlugin, `name`>
}

export const isRegistered = (name: string) => {
  return getPlugins()?.some(plugin => plugin.name === name)
}

export const register = ({name, filters = {}, ...settings}: Props) => {
  isRegistered(name) && unregister({name, filters, ...settings})
  registerPlugin(name, settings)
  filterCallback(filters, name, (filter, api) => api.register(filter))
}

export const unregister = ({name, filters}) => {
  filterCallback(filters, name, (filter, api) => api.unregister(filter))
  unregisterPlugin(name)
}
