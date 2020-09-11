import {Api} from '@roots/bud-types'

const extend: Api.Extend = function (plugins) {
  if (!this.lo.isArray(plugins)) {
    return
  }

  plugins.map(plugin =>
    this.plugins.controller.use(plugin).build(),
  )

  return this
}

export {extend as default}
