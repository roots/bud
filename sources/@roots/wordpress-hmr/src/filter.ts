import {addFilter, removeFilter} from '@wordpress/hooks'

export type Fn = (...args: any[]) => any

export type Filter = {
  name: string
  hook: string
  callback: Fn
}

export const register = (filter: Filter) =>
  addFilter(filter.hook, filter.name, filter.callback)

export const unregister = (filter: Filter) =>
  removeFilter(filter.hook, filter.name)
