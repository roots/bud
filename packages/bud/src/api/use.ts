import {Api} from '@roots/bud-typings'
import {isArray} from 'lodash'

const use: Api.Use = function (plugins) {
  if (isArray(plugins)) {
    plugins.forEach(plugin => {
      typeof plugin == 'function'
        ? this.controller.use(plugin).build()
        : null
    })
  } else {
    this.controller.use(plugins).build()
  }

  return this
}

export {use}
