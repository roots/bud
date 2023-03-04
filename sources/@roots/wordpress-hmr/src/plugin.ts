import {addFilter, removeFilter} from '@wordpress/hooks'
import type {Plugin} from '@wordpress/plugins'
import {registerPlugin, unregisterPlugin} from '@wordpress/plugins'

import type * as Filter from './filter.js'

export interface Props extends Plugin {
  name: string
  filters: Filter.Registry,
  settings: Record<string, any>
}

export const register = ({name, filters, ...settings}: Props) => {
  registerPlugin(name, settings)
  filters && Object.entries(filters)?.map(([hookName, registrations]) =>
    Object.entries(registrations).map(([namespace, handler]) => {
      addFilter(hookName, namespace, handler)
    }),
  )
}

export const unregister = ({name, filters}) => {
  unregisterPlugin(name)
  filters && Object.entries(filters)?.map(([hookName, registrations]) =>
    Object.keys(registrations).map((namespace) => {
      removeFilter(hookName, namespace)
    }),
  )
}
