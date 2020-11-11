import {lodash as _} from '@roots/bud-support'

export const copy: Framework.API.Copy = function (
  this: Framework.Bud,
  {
    from,
    context = null,
    to = null,
    globOptions = {
      ignore: '.*',
    },
  },
) {
  this.extensions.get(`copy-webpack-plugin`).push('patterns', {
    from,
    context: context ?? this.src(),
    to: to ?? this.distPath(),
    globOptions: globOptions ?? {
      ignore: '.*',
    },
    noErrorOnMissing: true,
  })

  return this
}
