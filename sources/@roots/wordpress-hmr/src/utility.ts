import type {
  KeyedFilters,
  RegisterProps,
  RegistrationModule,
} from './filter.js'

import * as api from './filter.js'

export const enforceNamespace = (id: string, name: string) =>
  id.startsWith(name) ? id : `${name}/${id}`

export const filterCallback = (
  filters?: KeyedFilters,
  namespace?: string,
  handle?: (filter: RegisterProps, register: RegistrationModule) => void,
) => {
  if (!filters || !namespace || !handle) return

  Object.entries(filters).map(([hook, records]) =>
    Object.entries(records).map(([name, callback]) => {
      name = enforceNamespace(name, namespace)
      handle({callback, hook, name}, api)
    }),
  )
}
