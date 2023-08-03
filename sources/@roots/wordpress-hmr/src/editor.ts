import type {
  AcceptCallback,
  AfterCallback,
  ContextFactory,
} from '@roots/wordpress-hmr'

import {Cache} from '@roots/wordpress-hmr/cache'
import {dispatch} from '@wordpress/data'

export interface Props {
  accept: AcceptCallback
  after?: AfterCallback
  api: {
    register: (...args: Array<any>) => void
    unregister: (...args: Array<any>) => void
  }
  before?: () => unknown
  getContext: ContextFactory
}

let initial = true

let notify = true

export const setNotify = (value: boolean) => {
  notify = value
}

export const load = ({accept, after, api, before, getContext}: Props) => {
  const cache = new Cache()

  const handler = () => {
    const changed: Array<{name: string}> = []

    before && before()

    const context = getContext()

    context?.keys().forEach((key: string) => {
      const raw = context(key)
      const source = raw.default ?? raw

      if (cache.is(key, source)) return
      if (cache.has(key)) api.unregister(cache.get(key))

      api.register(source)
      changed.push(source)
      cache.set(key, source)
    })

    after && after(changed)

    if (initial && notify && import.meta.webpackHot) {
      initial = false

      dispatch(`core/notices`).createInfoNotice(`🔥 Reload enabled`, {
        id: `hmr-enabled`,
        type: `snackbar`,
      })
    }

    return context
  }

  const {id} = handler()
  accept(id, handler)
}
