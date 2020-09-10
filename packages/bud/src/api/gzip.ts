import {Api} from '@roots/bud-typings'

const gzip: Api.Gzip = function (options?) {
  this.features.set('gzip', true)
  options &&
    this.options.merge(
      ['webpack', 'plugins', 'compression', 'gzip'],
      options,
    )

  return this
}

export {gzip}
