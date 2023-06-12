import {addFilter, hasFilter, removeFilter} from '@wordpress/hooks'

export type Callback = (...args: any[]) => any

export type KeyedFilters = Record<string, Record<string, Callback>>

export type RegisterProps = {
  callback: Callback
  hook: string
  name: string
}

export interface UnregisterProps extends Partial<RegisterProps> {
  hook: string
  name: string
}

export interface RegistrationModule {
  register: (filter: RegisterProps) => void
  unregister: (props: UnregisterProps) => void
}

export const register: RegistrationModule[`register`] = ({
  callback,
  hook,
  name,
}) => {
  hasFilter(hook, name) && unregister({hook, name})
  addFilter(hook, name, callback)
}

export const unregister: RegistrationModule[`unregister`] = ({
  hook,
  name,
}) => removeFilter(hook, name)
