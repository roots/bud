import {Api} from '@roots/bud-typings'

export const proxy: Api.Proxy = function (config) {
  this.options.set('proxy', config?.enabled ?? true)

  if (config) {
    const props = ['host', 'port']

    props.forEach(prop => {
      config[prop] &&
        this.store.set(`server.proxy.${prop}`, config[prop])
    })
  }

  return this
}
