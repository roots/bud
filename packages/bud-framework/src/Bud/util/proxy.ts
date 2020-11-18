import {Bud} from '@roots/bud-typings'

export const proxy: Proxy = function(
  bud: Bud.Contract,
  proxyTarget: any,
) {
  return new Proxy(proxyTarget, {
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

export type Proxy = (
  bud: Bud.Contract,
  proxyTarget: any,
) => Proxy
