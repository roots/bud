import {Api} from '@roots/bud-types'

const extend: Api.Extend = async function (plugins) {
  if (!this.lo.isArray(plugins)) {
    return
  }

  const build = async plugin => {
    return await plugin.build()
  }

  plugins.map(plugin =>
    build(this.plugins.controller.use(plugin)),
  )

  return this
}

export {extend as default}
