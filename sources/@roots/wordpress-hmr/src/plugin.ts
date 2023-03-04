import type {Plugin} from '@wordpress/plugins'
import {registerPlugin, unregisterPlugin} from '@wordpress/plugins'

import type * as Filter from './filter.js'
import * as blockFilter from './filter.js'

export interface Props extends Plugin {
  name: string
  filters?: Record<string, Record<string, Filter.Fn>>
  settings: Record<string, any>
}

export const register = ({name, filters = {}, ...settings}: Props) => {
  registerPlugin(name, settings)

  Object.entries(filters)?.map(([hook, filterRecords]) =>
    Object.entries(filterRecords).map(([filterName, callback]) => {
      filterName = filterName.startsWith(name)
        ? filterName
        : `${name}/${filterName}`

      blockFilter.register({hook, name: filterName, callback})
    }),
  )
}

export const unregister = ({name, filters}) => {
  unregisterPlugin(name)

  Object.entries(filters)?.map(([hook, filterRecords]) =>
    Object.entries(filterRecords).map(([filterName, callback]) => {
      filterName = filterName.startsWith(name)
        ? filterName
        : `${name}/${filterName}`

      blockFilter.unregister({hook, name: filterName, callback})
    }),
  )
}
