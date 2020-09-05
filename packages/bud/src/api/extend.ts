import {Api} from '@roots/bud-typings'

const extend: Api.Extend = function (plugins) {
  if (this.lo.isArray(plugins)) {
    plugins.forEach(plugin => {
      this.plugins.controller.use(this, plugin).build()
    })
  } else {
    this.plugins.controller.use(this, plugins).build()
  }

  return this
}

export {extend as default}
