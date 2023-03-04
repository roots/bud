import {Cache} from './cache.js'

const isFunction = (value: any): boolean => typeof value === `function`
const noop = (...args: Array<any>) => null

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

    context?.keys().forEach((key: string) => {
      const {
        default: {name, ...settings},
      } = context(key)
      const registrable = {name, settings}

      if (cache.is(key, registrable)) return
      if (cache.has(key)) unregister(cache.get(key))

      register(registrable)
      changed.push(registrable)
      cache.set(key, registrable)
    })

    isFunction(after) && after(changed)
    return context
  }

  const context = loadModules()
  callback(context, loadModules)
}
