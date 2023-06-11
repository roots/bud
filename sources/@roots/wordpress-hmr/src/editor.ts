import {dispatch} from '@wordpress/data'

import type {AcceptCallback, ContextFactory} from './index.js'

import {Cache} from './cache.js'

export interface Props {
  accept: AcceptCallback
  after?: (changed?: Array<{name: string}>) => unknown
  api: {
    register: (...args: Array<any>) => void
    unregister: (...args: Array<any>) => void
  }
  before?: () => unknown
  getContext: ContextFactory
}

let initial = false
let notify = true
export const setNotify = (value: boolean) => {
  notify = value
}

export const load = ({
  accept,
  after = () => null,
  api,
  before = () => null,
  getContext,
}: Props) => {
  const cache = new Cache()

  const handler = () => {
    const changed = []

    before()

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

    after(changed)

    if (notify && import.meta.webpackHot) {
      if (!initial) {
        initial = true
        dispatch(`core/notices`).createInfoNotice(`🔥 Reload enabled`, {
          id: `hmr-enabled`,
          type: `snackbar`,
        })
      }
    }

    return context
  }

  const {id} = handler()
  accept(id, handler)
}
