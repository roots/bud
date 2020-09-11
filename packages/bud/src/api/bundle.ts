import {Api} from '@roots/bud-types'

const bundle: Api.Bundle = function (name, entries) {
  this.options.merge('webpack.entry', {
    ...this.hooks.filter('api.bundle.filter', {
      [name]: entries,
    }),
  })

  return this
}

export {bundle}
