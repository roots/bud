import {Api} from '@roots/bud-typings'

const bundle: Api.Bundle = function (name, entries) {
  entries.forEach(entry =>
    this.addExtensions([entry.split('.').pop()]),
  )

  this.options.set('webpack.entry', {
    ...this.options.get('webpack.entry'),
    ...this.hooks.filter('api.bundle.filter', {
      [`${name}`]: entries,
    }),
  })

  return this
}

export {bundle}
