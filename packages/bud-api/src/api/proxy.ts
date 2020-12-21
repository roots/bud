import {Framework, Server} from '@roots/bud-typings'

const props = ['host', 'port']

export const proxy: Proxy = function (config) {
  this.features.set('proxy', config?.enabled ?? true)

  config &&
    props.forEach(prop => {
      config[prop] &&
        this.server.config.set(`proxy.${prop}`, config[prop])
    })

  return this
}

export type Proxy = (
  this: Framework,
  config?: {
    enabled?: boolean
    host?: Server.Config['proxy']['host']
    port?: Server.Config['proxy']['port']
  },
) => Framework
