import type {Plugin} from '@wordpress/plugins'
import {
  getPlugins,
  registerPlugin,
  unregisterPlugin,
} from '@wordpress/plugins'

import type * as Filter from './filter.js'
import {filterCallback} from './utility.js'

export interface Props extends Plugin {
  name: string
  filters?: Filter.KeyedFilters
  settings: Record<string, any>
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
