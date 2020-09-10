import {Api} from '@roots/bud-typings'

const brotli: Api.Brotli = function (options?) {
  this.features.set('brotli', true)
  options &&
    this.options.merge(
      ['webpack', 'plugins', 'compression', 'brotli'],
      options,
    )

  return this
}

export {brotli}
