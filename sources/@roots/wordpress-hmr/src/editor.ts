import {dispatch} from '@wordpress/data'

import {Cache} from './cache.js'
import type {AcceptCallback, ContextFactory} from './index.js'

export interface Props {
  api: {
    register: (...args: Array<any>) => void
    unregister: (...args: Array<any>) => void
  }
  getContext: ContextFactory
  accept: AcceptCallback
  before?: () => unknown
  after?: (changed?: Array<{name: string}>) => unknown
}

let initial = false
let notify = true
export const setNotify = (value: boolean) => {
  notify = value
}

export const load = ({
  api,
  getContext,
  accept,
  before = () => null,
  after = () => null,
}: Props) => {
  const cache = new Cache()

  const handler = () => {
    const changed = []

    before()

    const context = getContext()

    context?.keys().forEach((key: string) => {
      const raw = context(key)
      const source = raw.default || raw

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
