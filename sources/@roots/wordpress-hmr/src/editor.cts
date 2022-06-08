import {isFunction, noop} from 'lodash-es'

import {Cache} from './cache.cjs'

export const load = ({
  getContext,
  callback,
  register,
  unregister,
  before = noop,
  after = noop,
}) => {
  const cache = new Cache()

  const loadModules = () => {
    isFunction(before) && before()

    const context = getContext()
    const changed = []

    context.keys().forEach((key: string) => {
      const module = context(key)

      if (cache.is(key, module)) return
      if (cache.has(key)) unregister(cache.get(key))

      register(module)
      changed.push(module)
      cache.set(key, module)
    })

    isFunction(after) && after(changed)

    return context
  }

  const context = loadModules()
  callback(context, loadModules)
}
