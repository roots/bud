import {Api} from '@roots/bud-types'

const terser: Api.Terser = function (options) {
  if (options) {
    this.options.set('webpack.plugins.terser', {
      ...this.options.get('webpack.plugins.terser'),
      ...options,
    })
  }

  return this
}

export {terser}
