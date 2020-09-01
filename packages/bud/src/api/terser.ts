import {Api} from '@roots/bud-typings'

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
