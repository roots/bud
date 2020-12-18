import {Bud} from '@roots/bud-typings'

/**
 * Currently unused.
 *
 * The ultimate goal is to use this class as
 * an aspect-oriented programming util.
 */
export const proxy: Proxy = function (bud: Bud, target: any) {
  return new Proxy(target, {
    get(target, prop) {
      const value = target[prop as string]

      console.log(prop, value)

      const bound =
        typeof value === 'function' ? value.bind(target) : value

      return bound
    },

    set(target, prop, val) {
      bud.logger.info({prop, val})
      return (target[prop.toString()] = val ? true : false)
    },
  })
}

export type Proxy = (bud: Bud, target: any) => Proxy
