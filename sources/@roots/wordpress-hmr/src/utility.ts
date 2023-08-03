import type {
  KeyedFilters,
  RegisterProps,
  RegistrationModule,
} from '@roots/wordpress-hmr/filter'

import * as api from '@roots/wordpress-hmr/filter'

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
