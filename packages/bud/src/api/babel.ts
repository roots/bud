import {Api} from '@roots/bud-typings'

const babel: Api.Babel = function (options) {
  this.features.enable('babel')

  this.options.set(
    'babel',
    this.hooks.filter('api.babel', {
      ...this.options.get('babel'),
      plugins: this.hooks.filter('api.babel.plugins', [
        ...this.options.get('babel.plugins'),
        ...(options.plugins ?? []),
      ]),
      presets: this.hooks.filter('api.babel.presets', [
        ...this.options.get('babel.presets'),
        ...(options.presets ?? []),
      ]),
    }),
  )

  return this
}

export {babel}
