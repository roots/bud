import {Bud as Application} from '@roots/bud-typings'

export const proxy: Application['proxy'] = function (
  bud: Application,
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
