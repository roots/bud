import {Api} from '@roots/bud-typings'

const bundle: Api.Bundle = function (name, entries) {
  this.options.merge('webpack.entry', {
    ...this.hooks.filter('api.bundle.filter', {
      [name]: entries,
    }),
  })

  return this
}

export {bundle}
