import {addFilter, hasFilter, removeFilter} from '@wordpress/hooks'

export type Callback = (...args: any[]) => any

export type Filter = {
  name: string
  hook: string
  callback: Callback
}

export type KeyedFilters = Record<string, Record<string, Callback>>

export interface UnregisterProps extends Partial<Filter> {
  hook: string,
  name: string
}

export interface RegistrationModule {
  register: (filter: Filter) => void
  unregister: (filter: Filter) => void
}

export const register = ({hook, name, callback}: Filter) => {
  hasFilter(hook, name) && unregister({hook, name})
  addFilter(hook, name, callback)
}

export const unregister = ({hook, name}: Partial<Filter> & {hook: string, name: string}) =>
  removeFilter(hook, name)
