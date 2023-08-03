import type * as Filter from '@roots/wordpress-hmr/filter'
import type {WPPlugin} from '@wordpress/plugins'

import {filterCallback} from '@roots/wordpress-hmr/utility'
import {
  getPlugins,
  registerPlugin,
  unregisterPlugin,
} from '@wordpress/plugins'

export interface Props extends WPPlugin {
  filters?: Filter.KeyedFilters
  name: string
  settings: Omit<WPPlugin, `name`>
}

export const isRegistered = (name: string) => {
  return getPlugins()?.some(plugin => plugin.name === name)
}

export const register = ({filters = {}, name, ...settings}: Props) => {
  isRegistered(name) && unregister({filters, name, ...settings})
  registerPlugin(name, settings)
  filterCallback(filters, name, (filter, api) => api.register(filter))
}

export const unregister = ({filters, name}) => {
  filterCallback(filters, name, (filter, api) => api.unregister(filter))
  unregisterPlugin(name)
}
